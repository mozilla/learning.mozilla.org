var should = require('should');
var sinon = window.sinon;

var TeachAPI = require('../../lib/teach-api').TeachAPI;

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

  it('does not set authorization header when logged out', function() {
    var api = new TeachAPI({storage: storage});

    api.request('GET', '/').end();
    requests[0].requestHeaders.should.eql({});
  });

  it('reports username when logged in', function() {
    var api = new TeachAPI({storage: storage});

    storage['TEACH_API_LOGIN_INFO'] = '{"username": "boop"}';
    should(api.getUsername()).equal("boop");
  });

  it('reports username is null if logged out', function() {
    var api = new TeachAPI({storage: storage});

    should(api.getUsername()).equal(null);
  });

  describe('startLogin()', function() {
    var personaCb;

    beforeEach(function() {
      personaCb = null;
      window.navigator.id = {
        get: function(cb) {
          personaCb = cb;
        }
      };
    });

    afterEach(function() {
      delete window.navigator.id;
    });

    it('does nothing if given no assertion', function(done) {
      var api = new TeachAPI({storage: storage});

      api.startLogin();
      api.on('login:cancel', function() {
        requests.should.eql([]);
        done();
      });
      personaCb(null);
    });

    it('emits error if navigator.id is falsy', function(done) {
      var api = new TeachAPI({storage: storage});

      delete window.navigator.id;
      api.once('login:error', function(err) {
        err.message.should.eql('navigator.id does not exist');
        done();
      });
      api.startLogin();
    });

    it('sends assertion to Teach API server', function() {
      var api = new TeachAPI({storage: storage});

      api.startLogin();
      personaCb('hi');

      requests.length.should.eql(1);

      var r = requests[0];

      r.url.should.eql('https://teach-api.herokuapp.com/auth/persona');
      r.requestHeaders.should.eql({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      });
      r.requestBody.should.eql('assertion=hi');
    });

    it('emits error upon general failure', function(done) {
      var api = new TeachAPI({storage: storage});

      api.startLogin();
      personaCb('hi');

      api.on('login:error', function(err) {
        err.response.text.should.eql('nope');
        err.hasNoWebmakerAccount.should.be.false;
        done();
      });

      requests[0].respond(403, {
        'Content-Type': 'text/html'
      }, 'nope');
    });

    it('reports when email has no Webmaker acct', function(done) {
      var api = new TeachAPI({storage: storage});

      api.startLogin();
      personaCb('hi');

      api.on('login:error', function(err) {
        err.hasNoWebmakerAccount.should.be.true;
        done();
      });

      requests[0].respond(403, {
        'Content-Type': 'text/html'
      }, 'invalid assertion or email');
    });

    it('stores login info and emits event upon success', function(done) {
      var api = new TeachAPI({storage: storage});
      var loginInfo = {
        'username': 'foo',
        'token': 'blah'
      };

      api.startLogin();
      personaCb('hi');

      api.on('login:success', function(info) {
        info.should.eql(loginInfo);
        JSON.parse(storage['TEACH_API_LOGIN_INFO'])
          .should.eql(loginInfo);
        done();
      });

      requests[0].respond(200, {
        'Content-Type': 'application/json'
      }, JSON.stringify(loginInfo));
    });
  });
});
