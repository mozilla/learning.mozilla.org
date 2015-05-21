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

var indexStatic;
var router;
var pageMeta = {};
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
  indexStatic.generate(req.url, {
    meta: pageMeta
  }, function(err, html) {
    if (err) {
      return next(err);
    }
    return res.type('html').send(html);
  });
});

app.use(express.static(DIST_DIR));

if (!module.parent) {
  console.log('Initializing server.');

  if (PRODUCTION) {
    console.log([
      'Production mode enabled. Note that "npm install" is assumed to',
      'have recently been run with NODE_ENV="production". If this is not',
      'the case, some or all static assets may be out of date.'
    ].join('\n'));
    pageMeta['git-rev'] = fs.readFileSync(gulpfile.GIT_REV_FILE, 'utf-8');
    console.log('This server is based on git commit ' +
                pageMeta['git-rev'] + '.');
    indexStaticWatcher.build(function(err, newIndexStatic) {
      if (err) {
        throw err;
      }

      console.log('Built server-side bundle.');
      updateIndexStatic(newIndexStatic);
      startApp();
    });
  } else {
    require('./lib/developer-help')();

    try {
      pageMeta['git-rev'] = gulpfile.getGitRev();
    } catch (e) {}

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
  }
}
