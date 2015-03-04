var path = require('path');
var webserver = require('gulp-webserver');
var _ = require('underscore');
var gulp = require('gulp');
var gutil = require('gulp-util');
var s3 = require('gulp-s3');
var gzip = require('gulp-gzip');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var prettify = require('gulp-prettify');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var plumber = require('gulp-plumber');

require('node-jsx').install();

if ('ENABLE_REACT_A11Y' in process.env)
  require('react-a11y')();

var IndexFileStream = require('./lib/gulp-index-file-stream');
var webpackConfig = require('./webpack.config');

var BUILD_TASKS = [
  'copy-dirs',
  'less',
  'webpack',
  'generate-index-files'
];

var COPY_DIRS = [
  'img/**',
  'vendor/bootstrap/css/**',
  'vendor/bootstrap/fonts/**',
];

var LESS_FILES = './less/**/*.less';

function onError(err) {
  gutil.log(gutil.colors.red(err));
  gutil.beep();
  this.emit('end');
}

function handleError() {
  return plumber({
    errorHandler: onError
  });
}

gulp.task('copy-dirs', function() {
  return gulp.src(COPY_DIRS, {
    base: '.'
  }).pipe(gulp.dest('./dist'));
});

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ './' ]
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', function() {
  webpackConfig.devtool = 'source-map';
  webpackConfig.plugin = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ];
  return gulp.src(webpackConfig.entry)
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', BUILD_TASKS.concat([
  'test-react-warnings'
]), function() {
  gutil.log(gutil.colors.green.bold("Yay, tests pass!"));
});

gulp.task('test-react-warnings', function() {
  var oldWarn = console.warn;
  var warnings = 0;

  console.warn = function(message) {
    warnings++;
    gutil.log(gutil.colors.red.bold(message));
  };

  return new IndexFileStream(require('./lib/index-static.jsx'))
    .on('end', function() {
      console.warn = oldWarn;
      if (warnings) {
        this.emit('error', new Error('At least one warning was logged.'));
      }
    })
    .pipe(gulp.dest('./dist'));
});

gulp.task('generate-index-files', function() {
  return new IndexFileStream(require('./lib/index-static.jsx'))
    .pipe(prettify({
      indent_size: 2
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', BUILD_TASKS);

gulp.task('dev', ['watch', 'server']);

gulp.task('watch', _.without(BUILD_TASKS, 'webpack'), function(cb) {
  gulp.src(webpackConfig.entry)
    .pipe(gulpWebpack(_.extend({
      watch: true
    }, webpackConfig)))
    .pipe(gulp.dest('./dist'));

  gulp.watch([
    'lib/**'
  ], function() {
    gutil.log('Rebuilding index HTML files.');

    // Ugh, because the *old* version of our index files are
    // already in node's require cache, we can't reload them, so
    // we'll run gulp in a subprocess so that it uses the latest
    // code.
    //
    // TODO: Figure out a better solution for this.
    require('child_process')
      .exec('gulp generate-index-files', function(err, stdout, stderr) {
        if (err) {
          gutil.log(gutil.colors.red.bold("Error rebuilding index files!"));
          gutil.log(stdout);
          gutil.log(stderr);
        } else {
          gutil.log("Index HTML files rebuilt.");
        }
      });
  });

  gulp.watch(COPY_DIRS, ['copy-dirs']);
  gulp.watch(LESS_FILES, ['less']);
});

gulp.task('server', function() {
  return gulp.src('dist')
    .pipe(webserver({
      livereload: {
        enable: true
      },
      port: 8008,
      fallback: 'index.html'
    }));
});

gulp.task('s3', BUILD_TASKS, function() {
  var key = process.env.AWS_ACCESS_KEY;
  var secret = process.env.AWS_SECRET_KEY;

  if (!key || !secret)
    throw new Error('Please set AWS_ACCESS_KEY and AWS_SECRET_KEY ' +
      'in your environment.');

  return gulp.src('./dist/**')
    .pipe(gzip())
    .pipe(s3({
      key: key,
      secret: secret,
      bucket: process.env.AWS_BUCKET || 'mozilla-learning-html',
      region: process.env.AWS_REGION || 'us-east-1'
    }, {
      gzippedOnly: true,
      headers: {
        'Cache-Control': 'max-age=600, public'
      }
    }));
});
