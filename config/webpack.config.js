var webpack = require('webpack');
var habitat = require('habitat');
habitat.load();

var production = process.env.NODE_ENV === 'production';
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
  devtool: production ? process.env.WEBPACK_DEVTOOL || 'source-map'
                      : process.env.WEBPACK_DEVTOOL || 'eval',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
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
      'LESS_AUTOPREFIXER',
      'SHOW_DEV_RIBBON',
      'NODE_ENV',
      'TEACH_API_URL',
      'GA_ACCOUNT',
      'MAPBOX_ACCESS_TOKEN',
      'MAPBOX_MAP_ID',
      'PLEDGE_MAILINGLIST_URL',
      'PLEDGE_MAILINGLIST_PRIVACY_NAME',
      'OPTIMIZELY_ID',
      'OPTIMIZELY_ACTIVE',
      'MAKE_METADATA_URL'
    ])),
    new webpack.optimize.CommonsChunkPlugin('commons',
                                            'commons.bundle.js')
  ].concat(
    production ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ] : []
  )
};
