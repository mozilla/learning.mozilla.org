if (process.env.NODE_ENV !== 'production' &&
    require('./config').IN_TEST_SUITE) {
  module.exports = require('../test/browser/stub-blog-feed-loader');
} else {
  module.exports = require('./google-blog-feed-loader');
}
