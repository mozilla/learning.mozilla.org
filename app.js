var path = require('path');
var fs = require('fs');
var express = require('express');
var Router = require('react-router');

var indexStaticWatcher = require('./lib/index-static-watcher').create();
var PORT = process.env.PORT || 8008;
var PRODUCTION = (process.env.NODE_ENV === 'production');
var DIST_DIR = path.join(__dirname, 'dist');
var WATCH_DELAY = 300;

var indexStatic;
var router;
var app = express();

var startApp = function() {
  app.listen(PORT, function() {
    console.log('Listening on port', PORT);
  });
};

var startDevApp = function() {
  var gulp = require('gulp');
  var gulpfile = require('./gulpfile');

  require('./lib/developer-help')();

  indexStaticWatcher.watch(WATCH_DELAY, function(newIndexStatic) {
    updateIndexStatic(newIndexStatic);
    console.log('Rebuilt server-side bundle.');
  });

  gulp.start('watch-webpack');
  gulp.start('less');
  gulp.start('copy-static-files');
  gulp.start('watch-static-files');

  gulp.watch(gulpfile.LESS_FILES, ['less']).on('change', function() {
    console.log('Rebuilding LESS files.');
  });

  startApp();
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
    startApp();
  });
};

var updateIndexStatic = function(newIndexStatic) {
  indexStatic = newIndexStatic;
  router = indexStatic ? Router.create({
    routes: indexStatic.routes
  }) : null;
};

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

app.use(function(req, res, next) {
  if (!router) {
    return res.send('Please wait while the server-side bundle regenerates.');
  }
  if (req.path in indexStatic.REDIRECTS) {
    return res.redirect(indexStatic.REDIRECTS[req.path]);
  }
  if (!router.match(req.url)) {
    if (router.match(req.path + '/')) {
      return res.redirect(req.path + '/');
    }
    return next('route');
  }
  indexStatic.generate(req.url, {}, function(err, html) {
    if (err) {
      return next(err);
    }
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
    startDevApp();
  }
}
