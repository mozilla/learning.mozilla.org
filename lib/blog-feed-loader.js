var config = require('./build/config');
var testFeeder = require('../test/browser/stub-blog-feed-loader');
var googleFeeder = require('./google-blog-feed-loader');

module.exports = (process.env.NODE_ENV !== 'production' && config.IN_TEST_SUITE) ? testFeeder : googleFeeder;
