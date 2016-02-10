var _ = require('underscore');
var BUILD_TASKS = require('./shared/build.tasks.js');
var gutil = require('gulp-util');
var gzip = require('gulp-gzip');
var s3 = require('gulp-s3');

module.exports = function(gulp) {

  gulp.task('s3', BUILD_TASKS, function() {
    var key = process.env.AWS_ACCESS_KEY;
    var secret = process.env.AWS_SECRET_KEY;

    gutil.log('NODE_ENV is ' + process.env.NODE_ENV + '.');

    if (!key || !secret) {
      throw new Error('Please set AWS_ACCESS_KEY and AWS_SECRET_KEY ' +
      'in your environment.');
    }

    // WARNING: Even if deploying to S3 fails, no errors will be raised.
    // https://github.com/nkostelnik/gulp-s3/issues/47

    return gulp.src('./dist/**')
      .pipe(gzip())
      .pipe(s3({
        key: key,
        secret: secret,
        bucket: process.env.AWS_BUCKET || 'teach.mofostaging.net',
        region: process.env.AWS_REGION || 'us-east-1'
      }, {
        gzippedOnly: true,
        headers: {
          'Cache-Control': 'max-age=600, public'
        }
      }));
  });

};
