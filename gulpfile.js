var path = require('path');
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
var config = require('./lib/config');
var travis = require('./lib/travis');
var server = require('./test/browser/server');

var BUILD_TASKS = [
  'beautify',
  'copy-test-dirs',
  'copy-images',
  'copy-event-resources',
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
      siteUrl: config.ORIGIN
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

gulp.task('copy-event-resources', function () {
  return gulp.src('event-resources/**', {
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
  var meta = {};
  var execSync = require('child_process').execSync;

  try {
    meta['git-rev'] = execSync('git rev-parse HEAD', {
      cwd: __dirname,
      encoding: 'utf8'
    }).slice(0, 40);
  } catch (e) {}

  return new IndexFileStream(require('./lib/index-static.jsx'), {
    meta: meta
  })
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

function watchIndexFiles() {
  var fs = require('fs');
  var nodeModules = {};
  var outputDir = path.join(__dirname, 'dist', 'index-static');
  var outputFilename = 'index-static.bundle.js';

  // http://jlongster.com/Backend-Apps-with-Webpack--Part-I
  fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });
  nodeModules['react/addons'] = 'commonjs react/addons';

  var compiler = require('webpack')({
    entry: './lib/index-static.jsx',
    target: 'node',
    devtool: 'sourcemap',
    externals: nodeModules,
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader' }
      ]
    },
    output: {
      library: 'yup', // Actual value isn't used, just needs to be a string.
      libraryTarget: 'commonjs2',
      path: outputDir,
      filename: outputFilename
    }
  });

  compiler.watch(200, function(err, stats) {
    if (err) {
      console.log("Fatal error during compiler.watch()", err);
      return;
    }
    var jsonStats = stats.toJson();
    var hasErrors = jsonStats.errors.length > 0;
    if (hasErrors) {
      console.log(stats.toString({colors: true}));
    }
    if (jsonStats.warnings.length > 0) {
      console.log(stats.toString({colors: true}));
    }
    if (!hasErrors) {
      var filename = path.join(outputDir, outputFilename);

      delete require.cache[filename];

      var indexStatic = require(filename);

      new IndexFileStream(indexStatic, {})
        .on('end', function() {
          console.log("Index HTML files rebuilt.");
        })
        .pipe(gulp.dest('./dist'));
    }
  });
}

gulp.task('watch', _.without(BUILD_TASKS, 'webpack'), function() {
  require('./lib/developer-help')();

  gulp.src(webpackConfig.entry.app)
    .pipe(webpack(_.extend({
      watch: true
    }, webpackConfig)))
    .pipe(gulp.dest('./dist'));

  watchIndexFiles();

  gulp.watch('img/**', ['copy-images']);
  gulp.watch('event-resources/**', ['copy-event-resources']);
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

  server.create().listen(config.DEV_SERVER_PORT, function() {
    gutil.log('Development server listening at ' +
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
