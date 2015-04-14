var path = require('path');
var webserver = require('gulp-webserver');
var _ = require('underscore');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var s3 = require('gulp-s3');
var gzip = require('gulp-gzip');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var webpack = require('gulp-webpack');
var plumber = require('gulp-plumber');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var sitemap = require('gulp-sitemap');
var beautify = require('gulp-jsbeautify');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

require('node-jsx').install();

// TODO: Some of our third-party components are triggering warnings
// from react-a11y, so we need to disable it for now to prevent
// warning spam. Hopefully in the future we can find a way to
// tell react-a11y to squelch warnings from third-party components.
//
// require('react-a11y')();

var IndexFileStream = require('./lib/gulp-index-file-stream');
var webpackConfig = require('./webpack.config');

var BUILD_TASKS = [
  'beautify',
  'copy-test-dirs',
  'copy-images',
  'copy-bootstrap',
  'copy-webmaker-app-icons',
  'less',
  'webpack',
  'sitemap'
];

var LINT_DIRS = [
    '*.js',
    'lib/**/*.js',
    'test/**/*.js',
    // Google analytics contains code from GA's snippet, which
    // is intentionally uglified and obfuscated and crap.
    '!lib/googleanalytics.js',
    // TODO let's figure out how to let our linters handle the test suite: delete the line below when we're ready
    '!test/**/*.js'
];

var LESS_FILES = './less/**/*.less';

var TRAVIS_DEPLOY_TO_S3_BRANCH = 'develop';

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

gulp.task('sitemap', ['generate-index-files'], function() {
  gulp.src('dist/**/*.html')
    .pipe(sitemap({
      siteUrl: process.env.ORIGIN || 'https://teach.webmaker.org'
    }))
    .pipe(gulp.dest('./dist'));
});

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
  return gulp.src('img/**', {
    base: '.'
  }).pipe(gulp.dest('./dist'));
});

gulp.task('copy-webmaker-app-icons', function () {
  return gulp.src(['node_modules/webmaker-app-icons/css/**', 'node_modules/webmaker-app-icons/fonts/**'], {
    base: 'node_modules/webmaker-app-icons'
  }).pipe(gulp.dest('./dist/vendor/webmaker-app-icons'));
});

gulp.task('copy-bootstrap', function () {
  return gulp.src(['node_modules/bootstrap/dist/css/**', 'node_modules/bootstrap/dist/fonts/**'], {
    base: 'node_modules/bootstrap/dist'
  }).pipe(gulp.dest('./dist/vendor/bootstrap'));
});

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

gulp.task('webpack', function() {
  return gulp.src(webpackConfig.entry.app)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist'));
});

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

  return new IndexFileStream(require('./lib/index-static.jsx'))
    .on('end', function() {
      console.warn = oldWarn;
      if (warnings) {
        this.emit('error', new Error('At least one warning was logged.'));
      }
    })
    .pipe(gulp.dest('./dist'));
});

gulp.task('generate-index-files', function() {
  return new IndexFileStream(require('./lib/index-static.jsx'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('beautify', function () {
  gulp.src(LINT_DIRS)
      .pipe(beautify({ config: 'node_modules/mofo-style/linters/.jsbeautifyrc' }))
      .pipe(gulp.dest('dist'));
});

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

gulp.task('lint-test', ['jscs', 'jshint', 'beautify']);

gulp.task('default', BUILD_TASKS);

gulp.task('watch', _.without(BUILD_TASKS, 'webpack'), function() {
  gulp.src(webpackConfig.entry.app)
    .pipe(webpack(_.extend({
      watch: true
    }, webpackConfig)))
    .pipe(gulp.dest('./dist'));

  gulp.watch([
    'lib/**',
    'components/**',
    'mixins/**',
    'pages/**'
  ], function() {
    gutil.log('Rebuilding index HTML files.');

    // Ugh, because the *old* version of our index files are
    // already in node's require cache, we can't reload them, so
    // we'll run gulp in a subprocess so that it uses the latest
    // code.
    //
    // TODO: Figure out a better solution for this.
    require('child_process')
      .exec('gulp sitemap', function(err, stdout, stderr) {
        if (err) {
          gutil.log(gutil.colors.red.bold('Error rebuilding index files!'));
          gutil.log(stdout);
          gutil.log(stderr);
        } else {
          gutil.log('Index HTML files rebuilt.');
        }
      });
  });

  gulp.watch('img/**', ['copy-images']);
  gulp.watch(LESS_FILES, ['less']);
  gulp.watch('test/browser/static/**', ['copy-test-dirs']);
  gulp.watch([
    'gulpfile.js',
    'package.json',
    'webpack.config.js'
  ], function(event) {
    var filename = path.basename(event.path);
    gutil.log(gutil.colors.red.bold(filename + ' was ' + event.type + '.'));
    gutil.log(gutil.colors.red.bold('Please restart the watch process ' +
                                    'with "npm start".'));
    process.exit(0);
  });

  gulp.src('dist')
    .pipe(webserver({
      livereload: {
        enable: true
      },
      host: '0.0.0.0',
      port: 8008
    }));
});

gulp.task('s3', BUILD_TASKS, function() {
  var key = process.env.AWS_ACCESS_KEY;
  var secret = process.env.AWS_SECRET_KEY;

  gutil.log('NODE_ENV is ' + process.env.NODE_ENV + '.');
  if (process.env.TRAVIS === 'true') {
    gutil.log('Travis build detected.');
    if (process.env.TRAVIS_PULL_REQUEST === 'false' &&
        process.env.TRAVIS_BRANCH === TRAVIS_DEPLOY_TO_S3_BRANCH) {
      gutil.log('Pushing to S3.');
    } else {
      gutil.log('Current travis build is either a PR or not on the ' +
                TRAVIS_DEPLOY_TO_S3_BRANCH +
                ' branch, so not pushing to S3.');
      return;
    }
  }

  if (!key || !secret) {
    throw new Error('Please set AWS_ACCESS_KEY and AWS_SECRET_KEY ' +
    'in your environment.');
  }
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
