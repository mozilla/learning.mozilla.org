var should = require('should');
var sinon = window.sinon;

var TeachAPI = require('../../lib/teach-api');

describe('TeachAPI', function() {
  var xhr, requests, storage;

  beforeEach(function() {
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
    storage = {};
  });

  afterEach(function() {
    xhr.restore();
  });

  it('emits username:change event on logout', function(done) {
    var api = new TeachAPI({storage: storage});

    storage['TEACH_API_LOGIN_INFO'] = '{"username": "bop"}';
    api.on('username:change', function(username) {
      should(username).equal(null);
      done();
    });
    api.logout();
  });

  it('emits no username:change on logout when unchanged', function() {
    var api = new TeachAPI({storage: storage});
    var eventFired = false;

    api.on('username:change', function(username) { eventFired = true; });
    api.logout();
    eventFired.should.be.false;
  });

  it('clears storage on logout', function(done) {
    var api = new TeachAPI({storage: storage});

    storage['TEACH_API_LOGIN_INFO'] = 'blah';
    api.on('logout', function() {
      storage.should.eql({});
      done();
    });
    api.logout();
  });

  it('works if storage is corrupt', function() {
    var api = new TeachAPI({storage: storage});

    storage['TEACH_API_LOGIN_INFO'] = 'meh';
    should(api.getLoginInfo()).eql(null);
  });

  it('works if storage is empty', function() {
    var api = new TeachAPI({storage: storage});

    should(api.getLoginInfo()).eql(null);
  });

  it('works if storage has info', function() {
    var api = new TeachAPI({storage: storage});

    storage['TEACH_API_LOGIN_INFO'] = '{"u": 1}';
    should(api.getLoginInfo()).eql({u: 1});
  });

  it('sets authorization header when logged in', function() {
    var api = new TeachAPI({storage: storage});

    storage['TEACH_API_LOGIN_INFO'] = '{"token": "boop"}';
    api.request('GET', '/').end();
    requests.length.should.eql(1);
    requests[0].requestHeaders.should.eql({
      'Authorization': 'Token boop'
    });
  });

  it('does not set authorization header on bad URLs', function() {
    var api = new TeachAPI({
      baseURL: 'https://example.org',
      storage: storage
    });

    sinon.stub(console, 'warn');
    storage['TEACH_API_LOGIN_INFO'] = '{"token": "boop"}';
    api.request('GET', 'http://other.org/').end();
    requests.length.should.eql(1);
    requests[0].requestHeaders.should.eql({});
    console.warn.callCount.should.eql(1);
    console.warn.getCall(0).args[0].should.eql(
      "Teach API base URL is https://example.org which is at " +
      "a different origin from http://other.org/. Not sending auth token."
    );
    console.warn.restore();
  });

  it('does not set authorization header when logged out', function() {
    var api = new TeachAPI({storage: storage});

    api.request('GET', '/').end();
    requests[0].requestHeaders.should.eql({});
  });

  it('prepends base URL to requests', function() {
    var api = new TeachAPI({
      storage: storage,
      baseURL: 'http://example.org'
    });

    api.request('GET', '/foo').end();
    requests[0].url.should.eql('http://example.org/foo');
  });

  it('reports username when logged in', function() {
    var api = new TeachAPI({storage: storage});

    storage['TEACH_API_LOGIN_INFO'] = '{"username": "boop"}';
    should(api.getUsername()).equal("boop");
  });

  it('reports admin URL when user is staff', function() {
    var api = new TeachAPI({storage: storage});

    storage['TEACH_API_LOGIN_INFO'] = '{"admin_url": "http://admin"}';
    should(api.getAdminURL()).equal("http://admin");
  });

  it('reports admin URL as null when user is not staff', function() {
    var api = new TeachAPI({storage: storage});

    storage['TEACH_API_LOGIN_INFO'] = '{"username": "boop"}';
    should(api.getAdminURL()).equal(null);
  });

  it('reports admin URL as null if logged out', function() {
    var api = new TeachAPI({storage: storage});

    should(api.getAdminURL()).equal(null);
  });

  it('reports username is null if logged out', function() {
    var api = new TeachAPI({storage: storage});

    should(api.getUsername()).equal(null);
  });

  it('autobinds its methods', function() {
    var api = new TeachAPI({storage: storage});
    var getClubs = api.getClubs;

    getClubs().should.eql([]);
  });

  describe('updateClubs()', function() {
    var api;

    beforeEach(function() {
      api = new TeachAPI({
        storage: storage,
        baseURL: 'http://example.org'
      });
    });

    it('accesses /api/clubs/', function() {
      api.updateClubs();
      requests.length.should.equal(1);
      requests[0].method.should.eql('get');
      requests[0].url.should.eql('http://example.org/api/clubs/');
    });

    it('updates internal clubs list', function() {
      api.updateClubs();
      requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, JSON.stringify([{name: "blah"}]));
      api.getClubs().should.eql([{name: "blah"}]);
    });

    it('emits clubs:change event', function(done) {
      api.on('clubs:change', function(data) {
        data.should.eql([{name: "blah"}]);
        done();
      });
      api.updateClubs();
      requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, JSON.stringify([{name: "blah"}]));
    });

    it('returns parsed JSON on success', function(done) {
      api.updateClubs(function(err, data) {
        should(err).equal(null);
        data.should.eql([{name: "blah"}]);
        done();
      });
      requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, JSON.stringify([{name: "blah"}]));
    });

    it('returns an error on failure', function(done) {
      api.updateClubs(function(err, data) {
        err.message.should.eql("Internal Server Error");
        done();
      });
      requests[0].respond(500);
    });
  });

  describe('addClub()', function() {
    var api;
    var club = {name: "my cool club"};

    beforeEach(function() {
      api = new TeachAPI({
        storage: storage,
        baseURL: 'http://example.org'
      });
    });

    it('accesses /api/clubs/', function() {
      api.addClub(club);
      requests.length.should.equal(1);
      requests[0].method.should.eql('post');
      requests[0].url.should.eql('http://example.org/api/clubs/');
    });

    it('sends JSON, returns parsed JSON on success', function(done) {
      api.updateClubs = sinon.spy();
      api.addClub(club, function(err, data) {
        should(err).equal(null);
        data.should.eql({name: "my cool club"});
        done();
      });
      requests[0].requestHeaders['Content-Type']
        .should.eql('application/json;charset=utf-8');
      requests[0].respond(201, {
        'Content-Type': 'application/json'
      }, requests[0].requestBody);
      api.updateClubs.callCount.should.equal(1);
    });

    it('returns an error on failure', function(done) {
      api.addClub(club, function(err, data) {
        err.message.should.eql("Internal Server Error");
        done();
      });
      requests[0].respond(500);
    });
  });

  describe('changeClub()', function() {
    var api;
    var club = {url: "http://foo/api/clubs/1/", name: "my cool club"};

    beforeEach(function() {
      api = new TeachAPI({
        storage: storage,
        baseURL: 'http://example.org'
      });
    });

    it('accesses club.url', function() {
      api.changeClub(club);
      requests.length.should.equal(1);
      requests[0].method.should.eql('put');
      requests[0].url.should.eql('http://foo/api/clubs/1/');
    });

    it('sends JSON, returns parsed JSON on success', function(done) {
      api.updateClubs = sinon.spy();
      api.changeClub(club, function(err, data) {
        should(err).equal(null);
        data.should.eql({
          url: "http://foo/api/clubs/1/",
          name: "my cool club"
        });
        done();
      });
      requests[0].requestHeaders['Content-Type']
        .should.eql('application/json;charset=utf-8');
      requests[0].respond(201, {
        'Content-Type': 'application/json'
      }, requests[0].requestBody);
      api.updateClubs.callCount.should.equal(1);
    });

    it('returns an error on failure', function(done) {
      api.changeClub(club, function(err, data) {
        err.message.should.eql("Internal Server Error");
        done();
      });
      requests[0].respond(500);
    });
  });

  describe('deleteClub()', function() {
    var api;

    beforeEach(function() {
      api = new TeachAPI({storage: storage});
    });

    it('accesses the given URL', function() {
      api.deleteClub('http://myserver/clubs/1');
      requests.length.should.equal(1);
      requests[0].method.should.eql('delete');
      requests[0].url.should.eql('http://myserver/clubs/1');
    });

    it('returns no error on success', function(done) {
      api.updateClubs = sinon.spy();
      api.deleteClub('http://foo', function(err) {
        should(err).equal(null);
        done();
      });
      requests[0].respond(204);
      api.updateClubs.callCount.should.equal(1);
    });

    it('returns an error on failure', function(done) {
      api.deleteClub('http://foo', function(err, data) {
        err.message.should.eql("Internal Server Error");
        done();
      });
      requests[0].respond(500);
    });
  });

  describe('checkLoginStatus()', function() {
    it('sends credentials with request', function() {
      var api = new TeachAPI({storage: storage});

      api.checkLoginStatus();
      requests.length.should.equal(1);
      requests[0].withCredentials.should.be.true;
    });

    it('emits error upon general failure', function(done) {
      var api = new TeachAPI({storage: storage});

      api.checkLoginStatus();

      api.on('login:error', function(err) {
        err.response.text.should.eql('nope');
        done();
      });

      requests[0].respond(403, {
        'Content-Type': 'text/html'
      }, 'nope');
    });

    it('calls logout', function() {
      var api = new TeachAPI({storage: storage});

      api.logout = sinon.spy();
      storage['TEACH_API_LOGIN_INFO'] = '{"username": "boop"}';
      api.checkLoginStatus();

      requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, JSON.stringify({username: null}));
      api.logout.callCount.should.equal(1);
    });

    it('stores login info, emits events on login', function(done) {
      var usernameEventEmitted = false;
      var api = new TeachAPI({storage: storage});
      var loginInfo = {
        'username': 'foo',
        'token': 'blah'
      };

      api.checkLoginStatus();

      api.on('username:change', function(username) {
        username.should.eql('foo');
        usernameEventEmitted = true;
      });
      api.on('login:success', function(info) {
        info.should.eql(loginInfo);
        JSON.parse(storage['TEACH_API_LOGIN_INFO'])
          .should.eql(loginInfo);
        usernameEventEmitted.should.be.true;
        done();
      });

      requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, JSON.stringify(loginInfo));
    });

    it('only emits username:change on login if changed', function(done) {
      var usernameEventEmitted = false;
      var api = new TeachAPI({storage: storage});
      var loginInfo = {
        'username': 'foo',
        'token': 'blah'
      };

      storage['TEACH_API_LOGIN_INFO'] = JSON.stringify(loginInfo);
      api.checkLoginStatus();

      api.on('username:change', function(username) {
        usernameEventEmitted = true;
      });
      api.on('login:success', function() {
        usernameEventEmitted.should.be.false;
        done();
      });

      requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, JSON.stringify(loginInfo));
    });
  });
});
