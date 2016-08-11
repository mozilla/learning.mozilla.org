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
    this.timeout(100000);

    var redirects = Object.keys(indexStatic.get().REDIRECTS);
    var urls = indexStatic.get().URLS.filter(function(route) {
      return redirects.indexOf(route) === -1;
    }).map(function(url) {
      if (url === '/') return '/';
      return '/' + url + '/';
    });

    function nextRequest(lastErr) {
      if (lastErr) {
        return done(lastErr);
      }
      if (urls.length === 0) {
        return done();
      }

      var url = urls.pop();
      request(app)
      .get(url)
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/\<title\>/)
      .end(nextRequest);
    }

    urls.length.should.not.equal(0);
    nextRequest();
  });

  it('serves static files', function(done) {
    this.timeout(10000);

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

  it('redirects to a locale', function(done) {
    request(app)
      .get('/foobar')
      .set('Accept-Language', 'en-US')
      .expect(function(res) {
       if(res.headers.location !== "/en-US/foobar") throw new Error("Doesn't redirect to locale");
      })
      .end(done);
  });

  it('preserves query params when forwarding to a locale', function(done) {
    request(app)
      .get('/foobar/?key=value&key2=value2')
      .set('Accept-Language', 'en-US')
      .expect(function(res) {
       if(res.headers.location !== "/en-US/foobar/?key=value&key2=value2") throw new Error("Doesn't preserve query params");
      })
      .end(done);
  });

  it('redirects to a 404', function(done) {
    request(app)
      .get('/asdfasdfasdf')
      .redirects(1)
      .expect(404)
      .end(done);
  });

  it('reports 404s without redirecting when given a locale', function(done) {
    this.timeout(10000);
    request(app)
      .get('/en-US/asdfasdfasdf')
      .expect(404)
      .end(done);
  });
});
