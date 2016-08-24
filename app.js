var path = require('path');
var fs = require('fs');
var express = require('express');
var helmet = require('helmet');
var url = require('url');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var match = ReactRouter.match;
var routington = require('routington');

var PORT = process.env.PORT || 8008;
var PRODUCTION = (process.env.NODE_ENV === 'production');
var DIST_DIR = path.join(__dirname, 'dist');
var CODEMOJI_URL = process.env.CODEMOJI_URL || "https://codemoji.mofostaging.net";
var localize = require('mofo-localize');

var WpPageChecker = require('./lib/wp-page-checker');

var habitat = require('habitat');
habitat.load('.env');

// the static HTML generator
var serverBundle = require('./build/server.library');
var router = React.createElement(Router, {routes: serverBundle.routes});
var matcher;

if (process.env.NODE_ENV !== 'production') {
  var requireUncached = require('require-uncached');
  var chokidar = require('chokidar');
  // reload our index and router if there's a change to the static site generator code
  chokidar.watch('./build').on('all', function(event, path) {
    serverBundle = requireUncached('./build/server.library');
    router = React.createElement(Router, {routes: serverBundle.routes});
  });
}

var app = express();
var locale = "";
var locales = require('./dist/locales.json');

app.disable('x-powered-by');

var notFoundHTML = [
  '<!doctype html>',
  '<html><head>',
  '<meta charset="utf-8">',
  '<title>404 - Page not found</title>',
  '</head><body>',
  '<p>404 - Page not found</p>',
  '</body></html>'
].join('');

/**
 * convert a site URL to a Router "path" value
 */
function urlToRoutePath(loc) {
  // For router-resolution, we don't want hashes...
  var pos = loc.indexOf('#');
  if (pos > -1) { loc = loc.substring(0,pos); }
  // And we don't want query strings, either...
  pos = loc.indexOf('?');
  if (pos > -1) { loc = loc.substring(0,pos); }
  // If this is not the site root, we need to remove the leading slash.
  if (loc !== '/') {
    loc = loc.replace(/^\//, '').replace(/\/$/, '');
  }
  return loc;
};

/**
 * generate a URL's static HTML 
 */
function renderComponentPage(location, res, locale) {
  serverBundle.generate(location, {locale: locale}, function(err, location, title, html) {
    if (err) {
      next(err);
    }
    res.type('html').send(html);
  });
}

// make sure the dir we'll be using for static hosting exists.
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

/**
 * Security Headers
 */
 var securityHeaders = {
  directives: {
    defaultSrc: [
      'www.youtube.com',
      'https://public.etherpad-mozilla.org'
    ],
    scriptSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      '\'unsafe-eval\'',
      'data:',
      'www.google-analytics.com',
      'cdn.optimizely.com',
      'https://www.google.com',
      'https://s.ytimg.com',
      'https://www.mozilla.org'
    ],
    fontSrc: [
      '\'self\'',
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ],
    styleSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'https://www.google.com',
      'fonts.googleapis.com',
      'https://api.tiles.mapbox.com',
      'https://s.ytimg.com'
    ],
    imgSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      '*'
    ],
    connectSrc: [
      '\'self\'',
      'https://www.google.com',
      '*.tiles.mapbox.com',
      '*.log.optimizely.com',
      '*.github.io',
      '*.mywebmaker.org',
      '*.makes.org',
      'bitly.mofoprod.net',
      process.env.TEACH_API_URL || 'https://teach-api-staging.herokuapp.com',
      url.parse(process.env.NEWSLETTER_MAILINGLIST_URL || 'https://basket-dev.allizom.org').hostname
    ]
  },
  reportOnly: false,
  browserSniff: false
};

if (process.env.ENABLE_PONTOON) {
  securityHeaders.directives.defaultSrc.push('https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com');
  securityHeaders.directives.scriptSrc.push('https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com');
  securityHeaders.directives.fontSrc.push('https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com');
  securityHeaders.directives.styleSrc.push('https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com');
  securityHeaders.directives.connectSrc.push('https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com');
  securityHeaders.directives['frame-ancestors'] = ['https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com'];
}
app.use(helmet.contentSecurityPolicy(securityHeaders));

app.use(helmet.xssFilter({
  setOnOldIE: true
}));

app.use(helmet.hsts({
  maxAge: 1000 * 60 * 60 * 24 * 90
}));

app.use(helmet.ieNoOpen());

app.use(helmet.noSniff());

if (process.env.HPKP) {
  app.use(helmet.hpkp({
    maxAge: 1000 * 60 * 60 * 24 * 90,
    sha256s: process.env.HPKP.split(' '),
    setIf: function (req, res) {
      return req.secure;
    }
  }));
}


/**
 * Wait for the router to come online.
 */
app.use(function(req, res, next) {
  if (router) {
    return next();
  }
  res.send('Please wait while the server-side bundle regenerates.');
});

/**
 * If we have a router, check if we're dealing with a redirect.
 */
app.use(function(req, res, next) {
  var url = urlToRoutePath(req.path);
  if (!serverBundle.REDIRECTS[url]) {
    return next();
  }
  res.redirect('/' + serverBundle.REDIRECTS[url] + '/');
});

/**
 * If it's not a redirect, is it a component page?
 */
app.use(function(req, res, next) {
  var routes = serverBundle.routes;
  var location = urlToRoutePath(req.url);
  var urls = serverBundle.URLS;
  var lang;

  if (!matcher) {
    matcher = routington();
    urls.forEach(function(route) { matcher.define(route); });
  }

  match({ routes: routes, location: location}, function resolveRoute(err, redirect, props) {
    // is this even a component?
    if ( !props ) {
      return next();
    }

    // if this belongs to one of the predefined urls, let's generate its associated page
    if ( matcher.match(location) ) {
      var search = url.parse(req.url).search || "";

      locale = localize.parseLocale(req.headers["accept-language"], location, locales).locale;
      if (location === "/") {
        res.redirect(302, location + locale + search);
        return;
      }

      lang = location.split('/')[0];
      return renderComponentPage(location, res, lang);
    }

    // if neither of those, this is wordpress content
    else {
      // check to see a page with this slug exists on the WordPress site
      WpPageChecker(location, function(error, wpContent) {
        if ( error ) {
          return next();
        }
        // WP page exists, let's load the WordPress content through a component page
        return renderComponentPage(location,res);
      });
    }
  });
});

/**
 * codemoji redirect - https://github.com/mozilla/codemoji
 */
app.use('/codemoji', function(req, res) {
  var location = url.parse(CODEMOJI_URL);
  location.pathname = req.path;
  location.query = req.query;
  res.redirect(307, url.format(location));
});

/**
 * Is this a static asset?
 */
app.use(express.static(DIST_DIR));


/**
* Maybe it is a route, but needs the localized path
*/
app.use(function(req, res, next) {
  var location = url.parse(req.url).pathname;
  var search = url.parse(req.url).search || "";
  // Get a valid locale from the path and header
  var parsed = localize.parseLocale(req.headers["accept-language"], location, locales);
  var parsedLocale = parsed.locale;
  var parsedRedirect = parsed.redirect;
  // See if we should redirect.
  if (parsedRedirect) {
    res.redirect(307, "/" + parsedLocale + parsedRedirect + search);
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  res.status(404).send(notFoundHTML);
});

app.DIST_DIR = DIST_DIR;

var startProdApp = function() {
  app.listen(PORT, function() {
    console.log('Listening on port', PORT);
  });
};

module.exports = app;

if (!module.parent) {
  console.log('Initializing server.');
  startProdApp();
}

