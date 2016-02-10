var _ = require('underscore');
var gutil = require('gulp-util');
var travis = require('../lib/build/travis');

module.exports = function(gulp) {

  gulp.task('travis-after-success', function(cb) {
    var env = travis.getS3Env();

    if (env === null) {
      gutil.log('Current build does not need to be pushed to S3.');
      return;
    }

    require('child_process')
      .spawn(process.execPath, [process.argv[1], 's3'], {
        env: _.extend({}, process.env, env),
        stdio: 'inherit'
      }).on('close', function(code) {
        if (code !== 0) {
          gutil.log(gutil.colors.red.bold('Error deploying to S3!'));
          cb(new Error('gulp s3 failed with exit code ' + code));
        } else {
          gutil.log('Site deployed to S3.');
          cb(null);
        }
      });
  });

};
