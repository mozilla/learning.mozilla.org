var path = require('path');
var _ = require('underscore');
var gulp = require('gulp');
var gutil = require('gulp-util');
var s3 = require('gulp-s3');
var gzip = require('gulp-gzip');
var less = require('gulp-less');
var prettify = require('gulp-prettify');
var webpack = require('gulp-webpack');

require('node-jsx').install();

var IndexFileStream = require('./gulp-index-file-stream');
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

gulp.task('copy-dirs', function() {
  return gulp.src(COPY_DIRS, {
    base: '.'
  }).pipe(gulp.dest('./dist'));
});

gulp.task('less', function() {
  return gulp.src(LESS_FILES)
    .pipe(less({
      paths: [path.join(__dirname, 'less')]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', function() {
  return gulp.src(webpackConfig.entry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist'));
});

gulp.task('generate-index-files', function() {
  return new IndexFileStream(require('./index-static.jsx'))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', BUILD_TASKS);

gulp.task('watch', _.without(BUILD_TASKS, 'webpack'), function(cb) {
  gulp.src(webpackConfig.entry)
    .pipe(webpack(_.extend({
      watch: true
    }, webpackConfig)))
    .pipe(gulp.dest('./dist'));

  gulp.watch([
    '*.jsx'
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
