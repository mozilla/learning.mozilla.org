var _ = require('underscore');
var webpack = require('webpack-stream');
var webpackConfig = require('../webpack.config');

module.exports = function(gulp) {

  gulp.task('webpack', function() {
    return gulp.src(webpackConfig.entry.app)
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('watch-webpack', function() {
    // We're specifically not returning the stream here,
    // because if we do that, this task would never end,
    // and tasks that depend on this one would never be run.
    gulp.src(webpackConfig.entry.app)
      .pipe(webpack(_.extend({
        watch: true
      }, webpackConfig)))
      .pipe(gulp.dest('./dist'));
  });

};
