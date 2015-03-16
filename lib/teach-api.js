var EventEmitter = require('events').EventEmitter;
var util = require('util');
var _ = require('underscore');
var request = require('superagent');

var STORAGE_KEY = 'TEACH_API_LOGIN_INFO';

function TeachAPI(options) {
  options = options || {};

  this.baseURL = options.baseURL || 'https://teach-api.herokuapp.com';
  this.storage = options.storage || window.sessionStorage;
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
  startLogin: function() {
    if (!window.navigator.id) {
      return this.emit('error',
                       new Error('navigator.id does not exist'));
    }
    window.navigator.id.get(function(assertion) {
      if (!assertion) {
        return;
      }

      request
        .post(this.baseURL + '/auth/persona')
        .type('form')
        .send({ assertion: assertion })
        .end(function(err, res) {
          if (err) {
            return this.emit('error', err);
          }
          if (res.status != 200) {
            return this.emit('login-error', new Error(res.text));
          }

          this.storage[STORAGE_KEY] = JSON.stringify(res.body);
          this.emit('login', res.body);
        }.bind(this));
    }.bind(this));
  }
});

module.exports = TeachAPI;
