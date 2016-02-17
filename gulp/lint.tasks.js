var LINT_DIRS = require('./shared/lint.dirs.js');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

module.exports = function(gulp) {

  gulp.task('jshint', function() {
    return gulp.src(LINT_DIRS)
        .pipe(jshint({ lookup: 'node_modules/mofo-style/linters/.jshintrc' }))
        .pipe(jshint.reporter('default'));
  });


  gulp.task('jscs', function () {
    // jscs doesn't play nice with *.jsx files so we're avoiding lib/*.jsx
    return gulp.src(LINT_DIRS)
        .pipe(jscs({ configPath: 'node_modules/mofo-style/linters/.jscsrc' }));
  });

  gulp.task('lint-test', ['jscs', 'jshint']);

};
