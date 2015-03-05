var webpack = require('webpack');

module.exports = {
  entry: {
    app: './lib/main.jsx',
    tests: './test/browser/main.js'
  },
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: "jsx-loader"}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('commons',
                                            'commons.bundle.js')
  ]
};
