var should = require('should');

var indexStatic = require('./index-static-singleton');

describe('index-static', function() {
  beforeEach(indexStatic.build);

  it('should work w/o meta options', function(done) {
    indexStatic.get().generate('/', {}, function(err, html) {
      should(err).equal(null);
      done();
    });
  });

  it('should include meta options', function(done) {
    indexStatic.get().generate('/', {
      meta: { foo: 'bar' }
    }, function(err, html) {
      should(err).equal(null);
      html.should.match(/meta name="foo" content="bar"/);
      done();
    });
  });

  it('should include page title', function(done) {
    indexStatic.get().generate('/', {
      title: 'hello there'
    }, function(err, html) {
      should(err).equal(null);
      html.should.match(/\<title\>hello there\<\/title\>/);
      done();
    });
  });
});