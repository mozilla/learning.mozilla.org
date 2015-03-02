var path = require('path');
var gulp = require('gulp');
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

gulp.task('copy-dirs', function() {
  return gulp.src([
    'img/**',
    'vendor/bootstrap/css/**',
    'vendor/bootstrap/fonts/**',
  ], {
    base: '.'
  }).pipe(gulp.dest('./dist'));
});

gulp.task('less', function() {
  return gulp.src('./less/**/*.less')
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
