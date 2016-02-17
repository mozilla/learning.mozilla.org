var MINIMAL_BUILD_TASKS = require('./shared/minimal.build.tasks.js');
var BUILD_TASKS = require('./shared/build.tasks.js');

module.exports = function(gulp) {
  gulp.task('default', BUILD_TASKS);

  if (process.env.NODE_ENV === 'production') {
    gulp.task('postinstall', MINIMAL_BUILD_TASKS);
  } else {
    gulp.task('postinstall');
  }
};
