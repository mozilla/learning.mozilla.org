var should = require('should');

require('node-jsx').install();

var indexStatic = require('../lib/index-static.jsx');

describe('index-static', function() {
  it('should work w/o meta options', function(done) {
    indexStatic.generate('/', {}, function(html) {
      done();
    });
  });

  it('should include meta options', function(done) {
    indexStatic.generate('/', {
      meta: { foo: 'bar' }
    }, function(html) {
      html.should.match(/meta name="foo" content="bar"/);
      done();
    });
  });
});