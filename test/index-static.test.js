var should = require('should');

require('node-jsx').install({ extension: '.jsx' });

var indexStatic = require('../lib/index-static.jsx');

describe('index-static', function() {
  it('should work w/o meta options', function(done) {
    indexStatic.generate('/', {}, function(err, html) {
      should(err).equal(null);
      done();
    });
  });

  it('should include meta options', function(done) {
    indexStatic.generate('/', {
      meta: { foo: 'bar' }
    }, function(err, html) {
      should(err).equal(null);
      html.should.match(/meta name="foo" content="bar"/);
      done();
    });
  });
});