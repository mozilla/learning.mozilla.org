var BUILD_TASKS = require('./shared/build.tasks.js');
var gutil = require('gulp-util');

var index = require('./shared/index.functions');
var createIndexFileStream = index.createIndexFileStream;

module.exports = function(gulp) {

  gulp.task('smoketest', BUILD_TASKS.concat([
    'test-react-warnings'
  ]), function() {
    gutil.log(gutil.colors.green.bold('Yay, smoke test passes!'));
  });


  gulp.task('test-react-warnings', function() {
    var oldWarn = console.warn;
    var warnings = 0;

    console.warn = function(message) {
      warnings++;
      gutil.log(gutil.colors.red.bold(message));
    };

    return createIndexFileStream()
      .on('end', function() {
        console.warn = oldWarn;
        if (warnings) {
          this.emit('error', new Error('At least one warning was logged.'));
        }
      })
      .on('data', function() {
        // Drain the stream. We don't actually need to do anything with
        // the data, we just want to make sure no warnings are logged while
        // the stream's data is being generated.
      });
  });

};
