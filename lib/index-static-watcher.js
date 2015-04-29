var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

function watchIndexFiles(options, cb) {
  var nodeModules = {};
  var outputDir = options.outputDir;
  var outputFilename = 'index-static.bundle.js';

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

  compiler.watch(options.delay, function(err, stats) {
    if (err) {
      console.log('Fatal error during compiler.watch()', err);
      return;
    }
    var jsonStats = stats.toJson();
    var hasErrors = jsonStats.errors.length > 0;
    if (hasErrors) {
      console.log(stats.toString({ colors: true }));
    }
    if (jsonStats.warnings.length > 0) {
      console.log(stats.toString({ colors: true }));
    }
    if (!hasErrors) {
      var filename = path.join(outputDir, outputFilename);

      delete require.cache[filename];

      var indexStatic = require(filename);

      cb(indexStatic);
    }
  });
}

module.exports = watchIndexFiles;
