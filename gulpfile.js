var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var prettify = require('gulp-prettify');
var webpack = require('gulp-webpack');

require('node-jsx').install();

var IndexFileStream = require('./gulp-index-file-stream');
var webpackConfig = require('./webpack.config');

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

gulp.task('default', function() {
  gulp.start('copy-dirs', 'less', 'webpack', 'generate-index-files');
});
