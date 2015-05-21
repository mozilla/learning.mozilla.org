var path = require('path');
var fs = require('fs');
var express = require('express');
var gulp = require('gulp');
var webpack = require('webpack');
var Router = require('react-router');

var webpackConfig = require('./webpack.config.js');
var indexStaticWatcher = require('./lib/index-static-watcher').create();
var gulpfile = require('./gulpfile');

var PORT = process.env.PORT || 8008;
var PRODUCTION = (process.env.NODE_ENV === 'production');
var DIST_DIR = path.join(__dirname, 'dist');
var WATCH_DELAY = 300;
var STATIC_DIRS = [
  ['/', 'dist'],
  ['/test', 'test/browser/static'],
  ['/test', 'node_modules/mocha'],
  ['/img', 'img'],
  ['/vendor/webmaker-app-icons', 'node_modules/webmaker-app-icons'],
  ['/vendor/bootstrap', 'node_modules/bootstrap/dist']
];

var indexStatic;
var router;
var app = express();
var webpackCompiler = webpack(webpackConfig);

var startApp = function() {
  app.listen(PORT, function() {
    console.log('Listening on port', PORT);
  });
};

var updateIndexStatic = function(newIndexStatic) {
  indexStatic = newIndexStatic;
  router = Router.create({
    routes: indexStatic.routes
  });
};

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

app.use(function(req, res, next) {
  if (!PRODUCTION && !router) {
    return res.send('Please wait while the server-side bundle regenerates.');
  }
  if (!router.match(req.url)) {
    return next('route');
  }
  indexStatic.generate(req.url, {}, function(err, html) {
    if (err) {
      return next(err);
    }
    return res.type('html').send(html);
  });
});

STATIC_DIRS.forEach(function(info) {
  var abspath = path.join(__dirname, info[1]);
  if (!fs.existsSync(abspath)) {
    throw new Error('Directory does not exist: ' + info[1]);
  }
  app.use(info[0], express.static(abspath));
});

if (!module.parent) {
  console.log('Initializing server.');

  if (PRODUCTION) {
    gulp.start('less', 'webpack', function(err) {
      if (err) {
        throw err;
      }

      indexStaticWatcher.build(function(err, newIndexStatic) {
        if (err) {
          throw err;
        }

        console.log('Built server-side bundle.');
        updateIndexStatic(newIndexStatic);
        startApp();
      });
    });
  } else {
    require('./lib/developer-help')();

    indexStaticWatcher.watch(WATCH_DELAY, function(newIndexStatic) {
      updateIndexStatic(newIndexStatic);
      console.log('Rebuilt server-side bundle.');
    });

    gulp.start('watch-webpack');
    gulp.start('less');

    gulp.watch(gulpfile.LESS_FILES, ['less']).on('change', function() {
      console.log('Rebuilding LESS files.');
    });

    startApp();
  }
}
