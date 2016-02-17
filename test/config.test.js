var should = require('should');

var config = require('../config/config');

describe('config', function() {
  it('should think it is in a test suite', function() {
    config.IN_TEST_SUITE.should.be.true;
  });

  it('should think it is not in the browser', function() {
    config.IN_STATIC_SITE.should.be.false;
    config.GENERATING_STATIC_SITE.should.be.true;
  });
});
