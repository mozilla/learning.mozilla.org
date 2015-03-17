var webpack = require('webpack');

var IMPORT_ES5_SHIM = 'imports?shim=es5-shim/es5-shim&' +
                      'sham=es5-shim/es5-sham';

function importEnvVars(keys) {
  var result = {};

  keys.forEach(function(key) {
    if (typeof (process.env[key]) === 'string') {
      result['process.env.' + key] = JSON.stringify(process.env[key]);
    }
  });

  return result;
}

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
      { test: /\.jsx$/, loader: 'jsx-loader' },
      // https://github.com/webpack/webpack/issues/558#issuecomment-60889168
      { test: require.resolve('react'), loader: IMPORT_ES5_SHIM },
      { test: require.resolve('react/addons'), loader: IMPORT_ES5_SHIM },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(importEnvVars([
      'TEACH_API_URL',
      'GA_ACCOUNT',
      'MAPBOX_ACCESS_TOKEN',
      'MAPBOX_MAP_ID'
    ])),
    new webpack.optimize.CommonsChunkPlugin('commons',
                                            'commons.bundle.js')
  ]
};
