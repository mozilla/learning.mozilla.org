var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var less = require('gulp-less');
var path = require('path');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

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

module.exports = function(gulp) {

  gulp.task('less', function() {
    return gulp.src('./less/index.less')
      .pipe(handleError())
      .pipe(sourcemaps.init())
      .pipe(less({
        paths: [path.join(__dirname, 'less')],
        filename: 'styles.css'
      }))
      .pipe(gulpif(process.env.LESS_AUTOPREFIXER != 'off', autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
        remove: true
      })))
      .pipe(gulpif(process.env.NODE_ENV === 'production', cssmin()))
      .pipe(rename('styles.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'));
  });

};
