var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var webpack = require('gulp-webpack');

var webpackConfig = require('./webpack.config');

gulp.task('copy-dirs', function() {
  gulp.src([
    'img/**',
    'vendor/bootstrap/css/**',
    'vendor/bootstrap/fonts/**',
  ], {
    base: '.'
  }).pipe(gulp.dest('./dist'));
});

gulp.task('less', function() {
  gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less')]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', function() {
  gulp.src(webpackConfig.entry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
  gulp.start('copy-dirs', 'less', 'webpack');
});
