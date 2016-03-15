var config = require('../config/config');
var PassThrough = require('stream').PassThrough;
var sitemap = require('gulp-sitemap');

var index = require('./shared/index.functions');
var createIndexFileStream = index.createIndexFileStream;

module.exports = function(gulp) {

  gulp.task('generate-index-files', function() {
    return createIndexFileStream().pipe(gulp.dest('./dist'));
  });

  gulp.task('sitemap', function() {
    gulp.src('dist/**/*.html')
      .pipe(sitemap({
        siteUrl: config.ORIGIN
      }))
      .pipe(gulp.dest('./dist'));
  });

};
