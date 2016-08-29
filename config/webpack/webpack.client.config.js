/**
 * This is the webpack configuration for generating the
 * learning.mozilla.org client-side bundle that is loaded
 * in the user's browser when they visit any of our pages.
 */

var webpack = require('webpack');
var production = process.env.NODE_ENV === 'production';

var habitat = require('habitat');
habitat.load('.env');

var webpackConfig = {
  entry: {
    client: __dirname + '/../../lib/build/client.bundle.jsx'
  },
  devtool: production ? process.env.WEBPACK_DEVTOOL || 'source-map'
                      : process.env.WEBPACK_DEVTOOL || 'eval',
  output: {
    path: __dirname + '/../../dist',
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders:   ['babel', 'eslint'], exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('commons', 'commons.bundle.js')
  ].concat(
    production ? [
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
    ] : []
  )
};

module.exports = webpackConfig;
