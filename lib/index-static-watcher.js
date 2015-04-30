// This is essentially a webpack-based compiler for
// index-static.jsx. Much of the code is largely
// based on James Long's "Backend Apps With Webpack"
// series of blog posts:
//
// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
//
// Doing this allows us to use the same build toolchain
// for node and the browser, and also increases
// responsiveness during development via hot-loading.

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

function IndexStaticWatcher(options) {
  var self = {};
  var outputDir = options.outputDir;
  var outputFilename = 'index-static.bundle.js';
  var indexStatic = null;
  var buildInProgress = false;
  var entry = path.join(__dirname, 'index-static.jsx');
  var compiler = webpack({
    entry: entry,
    target: 'node',
    devtool: 'sourcemap',
    externals: function(context, request, callback) {
      if (request[0] == '.' || request == entry) {
        // It's either our entry point or a relative module, so include
        // it in the bundle.
        callback();
      } else {
        // It's a non-relative module, so load it via require().
        callback(null, 'commonjs ' + request);
      }
    },
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader' }
      ]
    },
    plugins: [
      new webpack.BannerPlugin('require("source-map-support").install();',
                               { raw: true, entryOnly: false })
    ],
    output: {
      library: 'yup', // Actual value isn't used, just needs to be a string.
      libraryTarget: 'commonjs2',
      path: outputDir,
      filename: outputFilename
    }
  });

  var onBuild = function(successCb, failureCb, err, stats) {
    failureCb = failureCb || function() {};
    if (err) {
      console.log('Fatal error while compiling ' + outputFilename, err);
      return failureCb();
    }
    var jsonStats = stats.toJson();
    var hasErrors = jsonStats.errors.length > 0;
    if (hasErrors) {
      console.log(stats.toString({ colors: true }));
    }
    if (jsonStats.warnings.length > 0) {
      console.log(stats.toString({ colors: true }));
    }
    if (hasErrors) {
      failureCb();
    } else {
      var filename = path.join(outputDir, outputFilename);

      // webpack's hot-loading infrastructure is actually
      // a bit overkill for our needs; since anything
      // that's changed during development is in our
      // single bundle file, and since our static site
      // building process is stateless, we can just
      // delete our bundle from the require cache and
      // re-require it.

      delete require.cache[filename];

      indexStatic = require(filename);
      successCb(indexStatic);
    }
  };

  self.build = function(cb) {
    var success = function() {
      buildInProgress = false;
      cb(null, indexStatic);
    };
    if (indexStatic) {
      return process.nextTick(success);
    } else if (buildInProgress) {
      return setTimeout(self.build.bind(null, cb), 100);
    }
    buildInProgress = true;
    compiler.run(onBuild.bind(null, success, function failure() {
      buildInProgress = false;
      cb(new Error('building ' + outputFilename + ' failed'));
    }));
  };

  self.watch = function(delay, successCb) {
    compiler.watch(delay, onBuild.bind(null, successCb, null));
  };

  return self;
}

IndexStaticWatcher.create = function() {
  var ROOT_DIR = path.normalize(path.join(__dirname, '..'));

  return IndexStaticWatcher({
    outputDir: path.join(ROOT_DIR, 'build', 'index-static')
  });
};

module.exports = IndexStaticWatcher;
