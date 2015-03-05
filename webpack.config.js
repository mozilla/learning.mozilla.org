module.exports = {
  module: {
    loaders: [{
      test: /\.js/,
      loaders: ['es6', 'jsx-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  }
};
