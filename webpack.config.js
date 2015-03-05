var webpack = require('webpack');

require('node-jsx').install();

var index = require('./lib/index-static.jsx');

module.exports = {
  entry: './lib/main.jsx',
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: index.JS_FILENAME
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: "jsx-loader"}
    ]
  }
};
