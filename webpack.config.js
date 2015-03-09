var webpack = require('webpack');

var IMPORT_ES5_SHIM = "imports?shim=es5-shim/es5-shim&" +
                      "sham=es5-shim/es5-sham";

module.exports = {
  entry: {
    app: './lib/main.jsx',
    manualTests: './test/browser/manual-main.jsx',
    tests: './test/browser/main.js'
  },
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: "jsx-loader"},
      // https://github.com/webpack/webpack/issues/558#issuecomment-60889168
      {test: require.resolve("react"), loader: IMPORT_ES5_SHIM},
      {test: require.resolve("react/addons"), loader: IMPORT_ES5_SHIM}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('commons',
                                            'commons.bundle.js')
  ]
};
