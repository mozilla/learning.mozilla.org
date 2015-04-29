var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

function IndexStaticWatcher(options) {
  var self = {};
  var nodeModules = {};
  var outputDir = options.outputDir;
  var outputFilename = 'index-static.bundle.js';
  var indexStatic = null;

  // http://jlongster.com/Backend-Apps-with-Webpack--Part-I
  fs.readdirSync(options.nodeModulesDir)
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .concat(options.externalModules || [])
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

  var compiler = webpack({
    entry: path.join(__dirname, 'index-static.jsx'),
    target: 'node',
    devtool: 'sourcemap',
    externals: nodeModules,
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

      delete require.cache[filename];

      indexStatic = require(filename);
      successCb(indexStatic);
    }
  };

  self.build = function(cb) {
    var success = function() {
      cb(null, indexStatic);
    };
    if (indexStatic) {
      return process.nextTick(success);
    }
    compiler.run(onBuild.bind(null, success, function failure() {
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
    nodeModulesDir: path.join(ROOT_DIR, 'node_modules'),
    outputDir: path.join(ROOT_DIR, 'dist', 'index-static'),
    externalModules: ['react/addons']
  });
};

module.exports = IndexStaticWatcher;
