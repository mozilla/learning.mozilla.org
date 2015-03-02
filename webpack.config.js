var webpack = require('webpack');

require('node-jsx').install();

var index = require('./index-static.jsx');

module.exports = {
  entry: './index-static.jsx',
  output: {
    path: __dirname + '/dist',
    filename: index.JS_FILENAME
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: "jsx-loader"}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
