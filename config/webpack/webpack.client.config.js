/**
 * This is the webpack configuration for generating the
 * learning.mozilla.org client-side bundle that is loaded
 * in the user's browser when they visit any of our pages.
 */

var webpack = require('webpack');
var production = process.env.NODE_ENV === 'production';
var habitat = require('habitat');

habitat.load('.env');

function importEnvVars(keys) {
  var result = {};

  keys.forEach(function(key) {
    if (typeof (process.env[key]) === 'string') {
      result['process.env.' + key] = JSON.stringify(process.env[key]);
    }
  });
  return result;
}

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
      {
        test: /\.jsx?$/,
        loaders: [
          'babel',
          'eslint',
          'document-env-vars'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(importEnvVars([
      'LESS_AUTOPREFIXER',
      'SHOW_DEV_RIBBON',
      'NODE_ENV',
      'TEACH_API_URL',
      'GA_ACCOUNT',
      'MAPBOX_ACCESS_TOKEN',
      'MAPBOX_MAP_ID',
      'NEWSLETTER_MAILINGLIST_URL',
      'OPTIMIZELY_ID',
      'OPTIMIZELY_ACTIVE',
      'MAKE_METADATA_URL',
      'WORDPRESS_DOMAIN',
      // feature flags:
      "ENABLE_BADGES",
      "ENABLE_PONTOON",
      "HIDE_NEWSLETTER_SIGNUP_FORM",

      "LOGIN_EMULATION",
      "LOGIN_EMULATION_LOGGEDOUT",
      "LOGIN_EMULATION_USERNAME"
    ])),
    new webpack.optimize.CommonsChunkPlugin('commons', 'commons.bundle.js')
  ].concat(
    production ? [
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
    ] : []
  )
};

module.exports = webpackConfig;
