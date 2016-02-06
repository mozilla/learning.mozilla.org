var path = require('path');
var fs = require('fs');
var express = require('express');

var React = require('react');
var Router = require('react-router').Router;

var indexStaticWatcher = require('./lib/build/index-static-watcher').create();
var PORT = process.env.PORT || 8008;
var PRODUCTION = (process.env.NODE_ENV === 'production');
var DIST_DIR = path.join(__dirname, 'dist');

var indexStatic;
var router;
var app = express();

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

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

app.use(function(req, res, next) {
  if (!router) {
    return res.send('Please wait while the server-side bundle regenerates.');
  }
  if (req.path in indexStatic.REDIRECTS) {
    //console.log("["+Date.now()+"] redirect");
    return res.redirect(indexStatic.REDIRECTS[req.path]);
  }
  if (!router.match(req.url)) {
    if (router.match(req.path + '/')) {
      //console.log("["+Date.now()+"] redirecting to url with / suffix");
      return res.redirect(req.path + '/');
    }
    return next('route');
  }
  indexStatic.generate(req.url, {}, function(err, html) {
    if (err) {
      return next(err);
    }
    //console.log("["+Date.now()+"] generated static index");
    return res.type('html').send(html);
  });
});

app.use(express.static(DIST_DIR));

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
