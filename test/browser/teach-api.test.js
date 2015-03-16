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

    it('does nothing if given no assertion', function() {
      var api = new TeachAPI({storage: storage});

      api.startLogin();
      personaCb(null);
      requests.should.eql([]);
    });

    it('emits error if navigator.id is falsy', function(done) {
      var api = new TeachAPI({storage: storage});

      delete window.navigator.id;
      api.once('error', function(err) {
        err.message.should.eql('navigator.id does not exist');
        done();
      });
      api.startLogin();
    });
  });
});
