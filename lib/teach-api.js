var EventEmitter = require('events').EventEmitter;
var util = require('util');
var _ = require('underscore');
var request = require('superagent');

var STORAGE_KEY = 'TEACH_API_LOGIN_INFO';

function TeachAPI(options) {
  options = options || {};

  this.baseURL = (options.baseURL ||
                  process.env.TEACH_API_URL ||
                  'https://teach-api.herokuapp.com');
  this.storage = options.storage || (
    process.browser ? window.sessionStorage : {}
  );
}

util.inherits(TeachAPI, EventEmitter);

_.extend(TeachAPI.prototype, {
  logout: function() {
    delete this.storage[STORAGE_KEY];
    this.emit('logout');
  },
  getLoginInfo: function() {
    try {
      return JSON.parse(this.storage[STORAGE_KEY]);
    } catch (e) {
      return null;
    }
  },
  getUsername: function() {
    var info = this.getLoginInfo();
    return info && info.username;
  },
  startLogin: function() {
    if (!(process.browser && window.navigator.id)) {
      return this.emit('login:error',
                       new Error('navigator.id does not exist'));
    }
    window.navigator.id.get(function(assertion) {
      if (!assertion) {
        return this.emit('login:cancel');
      }

      request
        .post(this.baseURL + '/auth/persona')
        .type('form')
        .send({ assertion: assertion })
        .end(function(err, res) {
          if (err) {
            err.hasNoWebmakerAccount = (
              err.response && err.response.forbidden &&
              err.response.text == 'invalid assertion or email'
            );
            return this.emit('login:error', err);
          }

          // TODO: Handle a thrown exception here.
          this.storage[STORAGE_KEY] = JSON.stringify(res.body);

          this.emit('login:success', res.body);
        }.bind(this));
    }.bind(this));
  },
  request: function(method, path) {
    var info = this.getLoginInfo();
    var req = request(method, path);

    if (info && info.token) {
      req.set('Authorization', 'Token ' + info.token);
    }

    return req;
  },
  getAllData: function(callback) {
    request('get', process.env.TEACH_API_URL || this.baseURL + "/api/clubs")
      .accept('json')
      .end(function(err, res) {
        if(err) {
          return callback(err);
        }
        try {
          callback(null, JSON.parse(res.text));
        } catch(e) {
          return callback(e);
        }
    });
  }
});

module.exports = new TeachAPI();
module.exports.TeachAPI = TeachAPI;
