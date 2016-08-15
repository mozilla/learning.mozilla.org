var merge = require('merge-stream');
var imageConverter = require('../lib/build/gulp-image-converter');
var imageConvertConfig = require('../config/image-convert.config');
var IMG_FILE_TYPES = require('./shared/image.file.types.js');

module.exports = function(gulp) {

  gulp.task('copy-static-files', [
    'copy-test-dirs',
    'copy-images',
    'copy-bootstrap',
    'copy-fontawesome',
    'copy-tabzilla',
    'copy-mofo-ui'
  ]);

  gulp.task('copy-test-dirs', function() {
    return merge(
      gulp.src('test/browser/static/**', {
        base: './test/browser/static'
      }),
      gulp.src('node_modules/mocha/mocha.*', {
        base: './node_modules/mocha'
      })
    ).pipe(gulp.dest('./dist/test'));
  });

  gulp.task('copy-images', function () {
    imageConvertConfig.reload();
    return gulp.src(IMG_FILE_TYPES, {
      base: '.'
    }).pipe(imageConverter(imageConvertConfig.patterns))
      .on('unconverted-patterns', function(patterns) {
        gutil.log(gutil.colors.red.bold(
          'No images matched the pattern(s): ' + patterns
        ));
        gutil.log('Please edit image-convert.config.js to fix this.');
      })
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('copy-bootstrap', function () {
    return gulp.src(['node_modules/bootstrap/dist/css/**', 'node_modules/bootstrap/dist/fonts/**'], {
      base: 'node_modules/bootstrap/dist'
    }).pipe(gulp.dest('./dist/vendor/bootstrap'));
  });

  gulp.task('copy-fontawesome', function () {
    return gulp.src(['node_modules/font-awesome/css/**', 'node_modules/font-awesome/fonts/**'], {
      base: 'node_modules/font-awesome'
    }).pipe(gulp.dest('./dist/vendor/font-awesome'));
  });

  gulp.task('copy-tabzilla', function () {
    return gulp.src(['node_modules/mozilla-tabzilla/css/tabzilla.css', 'node_modules/mozilla-tabzilla/media/img/**'], {
      base: 'node_modules/font-awesome'
    }).pipe(gulp.dest('./dist/vendor/font-awesome'));
  });

  gulp.task('copy-mofo-ui', function () {
    return gulp.src(['node_modules/mofo-ui/dist/mofo-ui.css'], {
      base: 'node_modules/mofo-ui/dist'
    }).pipe(gulp.dest('./dist/vendor/mofo-ui'));
  });

};
