var _ = require('underscore');
var should = require('should');

var travis = require('../lib/travis');

function env(options) {
  return _.extend({
    TRAVIS: 'true',
    TRAVIS_PULL_REQUEST: 'false',
    TRAVIS_BRANCH: 'develop'    
  }, options);
}

describe('travis.getS3Env', function() {
  var getS3Env = travis.getS3Env;

  it('returns null if TRAVIS is not "true"', function() {
    should(getS3Env(env({TRAVIS: 'false'}))).equal(null);
  });

  it('returns null if TRAVIS_PULL_REQUEST is not "false"', function() {
    should(getS3Env(env({TRAVIS_PULL_REQUEST: 'true'}))).equal(null);
  });

  it('returns null if TRAVIS_BRANCH is unrecognized', function() {
    should(getS3Env(env({TRAVIS_BRANCH: 'boop'}))).equal(null);
  });

  it('returns env for branch', function() {
    getS3Env(env({TRAVIS_BRANCH: 'master'}))
      .NODE_ENV.should.equal('production');
  });
});
