var habitat = require('habitat');
habitat.load('.env');

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

var urlToRoutePath = require('./server/url-to-route-path');
var renderComponentPage = require('./server/render-component-page');
var WpPageChecker = require('./lib/wp-page-checker');
var locales = require(path.join(DIST_DIR, 'locales.json'));
var locale = "";

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

/**
 * Several app security settings
 */
app.disable('x-powered-by');

var securityHeaders = require('./server/security-headers');
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
      return renderComponentPage(serverBundle, location, res, lang);
    }

    // if neither of those, this is wordpress content
    else {
      // check to see a page with this slug exists on the WordPress site
      WpPageChecker(location, function(error, wpContent) {
        if ( error ) {
          return next();
        }
        // WP page exists, let's load the WordPress content through a component page
        return renderComponentPage(serverBundle, location, res);
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

app.use(require('./server/404'));

var startProdApp = function() {
  app.listen(PORT, function() {
    console.log('\n\n==================================================');
    console.log('=                                                =');
    console.log('=         Server listening on port', PORT, '         =');
    console.log('=                                                =');
    console.log('==================================================\n');
  });
};

app.startProdApp = startProdApp;

module.exports = app;

// Auto-start only if this was not a require() call for app.js
if (!module.parent) { startProdApp(); }
