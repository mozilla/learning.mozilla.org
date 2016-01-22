var should = require('should');

var config = require('../../lib/build/config');

describe('config', function() {
  it('should think it is in a test suite', function() {
    config.IN_TEST_SUITE.should.be.true;
  });

  it('should think it is in the browser', function() {
    config.IN_STATIC_SITE.should.be.true;
    config.GENERATING_STATIC_SITE.should.be.false;
  });
});
