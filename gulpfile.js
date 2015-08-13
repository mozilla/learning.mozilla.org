var path = require('path');
var PassThrough = require('stream').PassThrough;
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
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var IndexFileStream = require('./lib/gulp-index-file-stream');
var imageConverter = require('./lib/gulp-image-converter');
var imageConvertConfig = require('./image-convert.config');
var webpackConfig = require('./webpack.config');
var config = require('./lib/config');
var travis = require('./lib/travis');
var staticServer = require('./test/browser/server');
var lightweightDynamicServer = require('./app');
var indexStaticWatcher = require('./lib/index-static-watcher').create();

var MINIMAL_BUILD_TASKS = [
  'copy-static-files',
  'less',
  'webpack'
];

var BUILD_TASKS = MINIMAL_BUILD_TASKS.concat([
  'sitemap'
]);

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

var IMG_FILE_TYPES = [
  'img/**/*.jpg',
  'img/**/*.png',
  'img/**/*.svg',
  'img/favicon.ico'
];

var LESS_FILES = './less/**/*.less';
var WATCH_DELAY = 200;

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

function createIndexFileStream() {
  var stream = new PassThrough({ objectMode: true });
  var meta = {};
  var execSync = require('child_process').execSync;

  try {
    meta['git-rev'] = execSync('git rev-parse HEAD', {
      cwd: __dirname,
      encoding: 'utf8'
    }).slice(0, 40);
  } catch (e) {}

  indexStaticWatcher.build(function(err, indexStatic) {
    if (err) {
      return stream.emit('error', err);
    }
    new IndexFileStream(indexStatic, {
      meta: meta
    }).on('error', function(err) {
      stream.emit('error', err);
    }).pipe(stream);
  });

  return stream;
}

gulp.task('sitemap', ['generate-index-files'], function() {
  gulp.src('dist/**/*.html')
    .pipe(sitemap({
      siteUrl: config.ORIGIN
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-static-files', [
  'copy-test-dirs',
  'copy-images',
  'copy-bootstrap',
  'copy-fontawesome'
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

gulp.task('generate-index-files', function() {
  return createIndexFileStream().pipe(gulp.dest('./dist'));
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

gulp.task('lint-test', ['jscs', 'jshint']);

gulp.task('default', BUILD_TASKS);

gulp.task('watch-webpack', function() {
  // We're specifically not returning the stream here,
  // because if we do that, this task would never end,
  // and tasks that depend on this one would never be run.
  gulp.src(webpackConfig.entry.app)
    .pipe(webpack(_.extend({
      watch: true
    }, webpackConfig)))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch-static-files', function() {
  gulp.watch(IMG_FILE_TYPES.concat([
    'image-convert.config.js'
  ]), ['copy-images']);
  gulp.watch('test/browser/static/**', ['copy-test-dirs']);
});

gulp.task('watch-non-reloadable-files', function() {
  gulp.watch([
    'gulpfile.js',
    'package.json',
    'webpack.config.js',
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
  require('./lib/developer-help')();

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
    gutil.log('Development server listening at ' +
              gutil.colors.green.bold(config.ORIGIN) + '.');
  });
});

gulp.task('app', _.without(MINIMAL_BUILD_TASKS, 'webpack').concat([
  'watch-webpack',
  'watch-static-files',
  'watch-non-reloadable-files'
]), function() {
  require('./lib/developer-help')();

  indexStaticWatcher.watch(WATCH_DELAY, function(newIndexStatic) {
    lightweightDynamicServer.updateIndexStatic(newIndexStatic);
    console.log('Rebuilt server-side bundle.');
  });

  gulp.watch(LESS_FILES, ['less']);

  lightweightDynamicServer.listen(config.DEV_SERVER_PORT, function() {
    gutil.log('Lightweight dynamic server listening at ' +
              gutil.colors.green.bold(config.ORIGIN) + '.');
  });
});

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

if (process.env.NODE_ENV === 'production') {
  gulp.task('postinstall', MINIMAL_BUILD_TASKS);
} else {
  gulp.task('postinstall');
}

module.exports.LESS_FILES = LESS_FILES;
