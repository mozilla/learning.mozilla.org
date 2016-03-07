var path = require('path');
var fs = require('fs');
var express = require('express');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var match = ReactRouter.match;

var indexStaticWatcher = require('./lib/build/index-static-watcher').create();
var PORT = process.env.PORT || 8008;
var PRODUCTION = (process.env.NODE_ENV === 'production');
var DIST_DIR = path.join(__dirname, 'dist');

var WpPageChecker = require('./lib/wp-page-checker');

var habitat = require('habitat');
habitat.load('.env');

var indexStatic;
var router;
var app = express();

var notFoundHTML = [
  '<!doctype html>',
  '<html><head>',
  '<meta charset="utf-8">',
  '<title>404 - Page not found</title>',
  '</head><body>',
  '<p>404 - Page not found</p>',
  '</body></html>'
].join('');

var urlToRoutePath = function(loc) {
  if (loc !== '/') {
    loc = loc.replace(/^\//, '').replace(/\/$/, '');
  }
  return loc;
};

var startProdApp = function() {
  console.log([
    'Production mode enabled. Note that "npm install" is assumed to',
    'have recently been run with NODE_ENV="production". If this is not',
    'the case, some or all static assets may be out of date.'
  ].join('\n'));
  indexStaticWatcher.build(function(err, newIndexStatic) {
    if (err) {
      throw err;
    }

    console.log('Built server-side bundle.');
    updateIndexStatic(newIndexStatic);
    app.listen(PORT, function() {
      console.log('Listening on port', PORT);
    });
  });
};

var updateIndexStatic = function(newIndexStatic) {
  indexStatic = newIndexStatic;
  router = indexStatic ? React.createElement(Router, {routes: indexStatic.routes}) : null;
};

// make sure the dir we'll be using for static hosting exists.
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
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
  if (!indexStatic.REDIRECTS[url]) {
    return next();
  }
  res.redirect('/' + indexStatic.REDIRECTS[url] + '/');
});

/**
 * Is this a static asset?
 */
app.use('/', express.static(DIST_DIR));

/**
 * If it's not a redirect, is it a component page?
 */
app.use(function(req, res, next) {
  var routes = indexStatic.routes;
  var location = urlToRoutePath(req.url);
  var urls = indexStatic.URLS;

  match({ routes: routes, location: location}, function resolveRoute(err, redirect, props) {
    // this is a valid component
    if (props) {
      // this belongs to one of the predefined urls, let's generate its associated page
      if ( urls.indexOf(location) != -1 ) {
        renderComponentPage(location,res);
      } else { // check to see a page with this slug exists on the WordPress site
        WpPageChecker(location, function(error, wpContent) {
          if ( error ) {
            console.log("///// WpPageChecker error");
            return next();
          }
          // WP page exists, let's load the WordPress content through a component page
          renderComponentPage(location,res);
        });
      }
    } else { // Note we will never hit here due to our React Router's routes setup. (See routes.jsx)
      return next();
    }
  });
});

function renderComponentPage(location, res) {
  indexStatic.generate(location, {}, function(err, location, title, html) {
    if (err) {
      next(err);
    }
    res.type('html').send(html);
  });
}

app.use(function(req, res, next) {
  res.status(404).send(notFoundHTML);
});

app.DIST_DIR = DIST_DIR;
app.updateIndexStatic = updateIndexStatic;
module.exports = app;

if (!module.parent) {
  console.log('Initializing server.');

  if (PRODUCTION) {
    startProdApp();
  } else {
    console.log([
      'This server can only be run as a script when NODE_ENV="production".',
      'To run it in development mode, please use "npm run app".'
    ].join('\n'));
    process.exit(1);
  }
}
