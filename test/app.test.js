var fs = require('fs');
var path = require('path');
var should = require('should');
var request = require('supertest');

var indexStatic = require('./index-static-singleton');
var app = require('../app');

describe('app', function() {
  beforeEach(indexStatic.build);
  beforeEach(function() {
    app.updateIndexStatic(indexStatic.get());
  });

  it('reports when server-side bundle is regenerating', function(done) {
    app.updateIndexStatic(null);

    request(app)
      .get('/')
      .expect(200)
      .expect('Please wait while the server-side bundle regenerates.')
      .end(done);
  });

  it('returns 200 at all public HTML pages', function(done) {
    this.timeout(10000);

    var urls = indexStatic.get().URLS.filter(function(url) {
      return !(url in indexStatic.get().REDIRECTS);
    });

    function nextRequest(lastErr) {
      if (lastErr) {
        return done(lastErr);
      }
      if (urls.length === 0) {
        return done();
      }

      request(app)
        .get(urls.pop())
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(/\<title\>/)
        .end(nextRequest);
    }

    urls.length.should.not.equal(0);
    nextRequest();
  });

  it('serves static files', function(done) {
    var filename = path.join(app.DIST_DIR, 'hi.txt');
    var str = 'hi ' + Date.now();

    fs.writeFileSync(filename, str);
    request(app)
      .get('/hi.txt')
      .expect(200)
      .expect(str)
      .end(function(err) {
        fs.unlinkSync(filename);
        done(err);
      });
  });

  it('redirects old routes to new ones', function(done) {
    request(app)
      .get('/clubs/curriculum/')
      .expect('Location', '/activities/web-lit-basics/')
      .expect(302)
      .end(done);
  });

  it('adds trailing slash to public HTML pages', function(done) {
    request(app)
      .get('/clubs')
      .expect('Location', '/clubs/')
      .expect(302)
      .end(done);
  });

  it('reports 404s', function(done) {
    request(app)
      .get('/asdfasdfasdf')
      .expect(404)
      .end(done);
  });
});
