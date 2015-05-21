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
    var urls = indexStatic.get().URLS.slice();

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

  it('reports 404s', function(done) {
    request(app)
      .get('/asdfasdfasdf')
      .expect(404)
      .end(done);
  });
});
