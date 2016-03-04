var _ = require('underscore');
var config = require('../config/config');
var developerHelp = require('../lib/build/developer-help');
var gutil = require('gulp-util');
var indexStaticWatcher = require('../lib/build/index-static-watcher').create();
var lightweightDynamicServer = require('../app');
var MINIMAL_BUILD_TASKS = require('./shared/minimal.build.tasks.js');
var LESS_FILES = require('./shared/less.files.js');
var WATCH_DELAY = require('./shared/watch.delay.js');

module.exports = function(gulp) {

  gulp.task('app', _.without(MINIMAL_BUILD_TASKS, 'webpack').concat([
    'watch-webpack',
    'watch-static-files',
    'watch-non-reloadable-files'
  ]), function() {
    developerHelp();

    indexStaticWatcher.watch(WATCH_DELAY, function(newIndexStatic) {
      lightweightDynamicServer.updateIndexStatic(newIndexStatic);
      console.log('Rebuilt server-side bundle.');
    });

    gulp.watch(LESS_FILES, ['less']);

    lightweightDynamicServer.listen(config.DEV_SERVER_PORT, function() {
      gutil.log('Server defined by [app.js] listening at ' +
                gutil.colors.green.bold(config.ORIGIN) + '.');
    });
  });

};
