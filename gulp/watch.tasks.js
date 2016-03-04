var _ = require('underscore');
var path = require('path');
var BUILD_TASKS = require('./shared/build.tasks.js');
var config = require('../config/config');
var developerHelp = require('../lib/build/developer-help');
var gutil = require('gulp-util');
var IMG_FILE_TYPES = require('./shared/image.file.types.js');
var LESS_FILES = require('./shared/less.files.js');
var staticServer = require('../test/browser/server');
var WATCH_DELAY = require('./shared/watch.delay.js');

var index = require('./shared/index.functions');
var indexStaticWatcher = index.indexStaticWatcher;
var createIndexFileStream = index.createIndexFileStream;

module.exports = function(gulp) {

  gulp.task('watch-static-files', function() {
    gulp.watch(IMG_FILE_TYPES.concat([
      './config/image-convert.config.js'
    ]), ['copy-images']);
    gulp.watch('test/browser/static/**', ['copy-test-dirs']);
  });

  gulp.task('watch-non-reloadable-files', function() {
    gulp.watch([
      'gulpfile.js',
      'package.json',
      './config/webpack.config.js',
      'app.js'
    ], function(event) {
      var filename = path.basename(event.path);
      var cmd = process.argv[2] === 'app' ? 'npm run app' : 'npm start';
      gutil.log(gutil.colors.red.bold(filename + ' was ' + event.type + '.'));
      gutil.log(gutil.colors.red.bold('Please restart the server ' +
                                      'with "' + cmd + '".'));
      process.exit(0);
    });
  });

  gulp.task('watch', _.without(BUILD_TASKS, 'webpack').concat([
    'watch-webpack',
    'watch-static-files',
    'watch-non-reloadable-files'
  ]), function() {
    developerHelp();

    indexStaticWatcher.watch(WATCH_DELAY, function() {
      createIndexFileStream()
        .on('error', function(err) {
          gutil.log('Error rebuilding index HTML files.');
          gutil.log(gutil.colors.red.bold(err.stack));
        })
        .on('end', function() {
          gutil.log('Index HTML files rebuilt.');
        })
        .pipe(gulp.dest('./dist'));
    });

    gulp.watch(LESS_FILES, ['less']);

    staticServer.create().listen(config.DEV_SERVER_PORT, function() {
      gutil.log('Server defined by [test/browser/server.js] listening at ' +
                gutil.colors.green.bold(config.ORIGIN) + '.');
    });
  });

};
