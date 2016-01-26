var webpack = require('webpack');

/**
 * Webpack config for generating static pages.
 */
module.exports = function(entry, outputDir, outputFilename) {
  return {
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
        { test: /\.jsx$/, loader: 'jsx-loader' },
        { test: /\.json$/, loader: 'json-loader' }
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
  };
};
