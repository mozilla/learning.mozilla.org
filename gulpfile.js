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
var fs = require('fs-extra');

var IndexFileStream = require('./lib/gulp-index-file-stream');

if ('ENABLE_REACT_A11Y' in process.env)
  require('react-a11y')();

var BUILD_TASKS = [
  'copy-dirs',
  'less',
  'generate-index-files'
];

var COPY_DIRS = [
  'img/**',
  'vendor/bootstrap/css/**',
  'vendor/bootstrap/fonts/**',
];
var COMPILED_DIR = './dist/';

var LESS_FILES = './less/**/*.less';

function webpackTask(options) {
  console.log(options)
  options = options || {};
  var srcFile = './lib/index-static.jsx';
  var outputPath = path.join(__dirname, COMPILED_DIR, 'js');
  fs.removeSync(outputPath);
  var outputName = 'bundle.js';
  var config = require('./webpack.config');

  config.entry = srcFile;
  config.output = {
    filename: outputName
  };

  // Let's add some extra stuff.
  config.watch = options.watch;
  if (options.sourcemaps) config.devtool = 'eval';
  if (options.optimize) config.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ];

  return function() {
    return gulp.src(srcFile)
      .pipe(gulpWebpack(config))
      .pipe(gulp.dest(outputPath));
  };
}

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

gulp.task('generate-index-files', function() {
  return new IndexFileStream(require('./lib/index-static.jsx'))
    .pipe(prettify({
      indent_size: 2
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-dirs', function() {
  return gulp.src(COPY_DIRS, {
    base: '.'
  }).pipe(gulp.dest('./dist'));
});

gulp.task('less', function() {
  return gulp.src('./less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: ['./']
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

// gulp.task('webpack', webpackTask({sourcemaps: true}));
// gulp.task('webpack-optimized', webpackTask({optimize: true}));
gulp.task('watch-webpack', webpackTask({
  watch: true,
  sourcemaps: true
}));

gulp.task('build', BUILD_TASKS);

gulp.task('dev', ['watch-less', 'watch-webpack',   'generate-index-files', 'server']);

gulp.task('watch-less', ['less'], function() {
  gulp.watch('./less/**/*.less', ['less']);
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
