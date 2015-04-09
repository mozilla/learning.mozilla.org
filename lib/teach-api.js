var EventEmitter = require('events').EventEmitter;
var util = require('util');
var urlResolve = require('url').resolve;
var _ = require('underscore');
var request = require('superagent');
var ga = require('react-ga');

var STORAGE_KEY = 'TEACH_API_LOGIN_INFO';

function autobind(obj) {
  var prototypes = [].slice.call(arguments, 1);
  prototypes.forEach(function(prototype) {
    Object.keys(prototype).filter(function(propName) {
      return typeof obj[propName] == 'function';
    }).forEach(function(methodName) {
      obj[methodName] = obj[methodName].bind(obj);
    });
  });
}

function TeachAPI(options) {
  options = options || {};

  autobind(this, TeachAPI.prototype, EventEmitter.prototype);

  this.baseURL = options.baseURL || TeachAPI.getDefaultURL();
  this.storage = options.storage || (
    process.browser ? window.sessionStorage : {}
  );
  this._clubs = [];
}

TeachAPI.getDefaultURL = function() {
  return process.env.TEACH_API_URL || 'https://teach-api.herokuapp.com';
};

util.inherits(TeachAPI, EventEmitter);

_.extend(TeachAPI.prototype, {
  logout: function() {
    delete this.storage[STORAGE_KEY];
    this.emit('username:change', null);
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

          this.emit('username:change', res.body.username);
          this.emit('login:success', res.body);
        }.bind(this));
    }.bind(this));
  },
  checkLoginStatus: function() {
    request.get(this.baseURL + '/auth/status')
      .withCredentials()
      .accept('json')
      .end(function(err, res) {
        if (err) {
          this.emit('login:error', err);
          return;
        }
        if (res.body.username !== this.getUsername()) {
          if (res.body.username) {
            // TODO: Handle a thrown exception here.
            this.storage[STORAGE_KEY] = JSON.stringify(res.body);

            this.emit('username:change', res.body.username);
            this.emit('login:success', res.body);
          } else {
            this.logout();
          }
        }
      }.bind(this));
  },
  request: function(method, path) {
    var info = this.getLoginInfo();
    var url = urlResolve(this.baseURL, path);
    var req = request(method, url);

    if (info && info.token) {
      if (url.indexOf(this.baseURL + '/') === 0) {
        req.set('Authorization', 'Token ' + info.token);
      } else {
        console.warn('Teach API base URL is ' + this.baseURL +
                     ' which is at a different origin from ' +
                     url + '. Not sending auth token.');
      }
    }

    return req;
  },
  getClubs: function() {
    return this._clubs;
  },
  updateClubs: function(callback) {
    callback = callback || function () {};
    return this.request('get', '/api/clubs/')
      .accept('json')
      .end(function(err, res) {
        if (err) {
          return callback(err);
        }
        this._clubs = res.body;
        this.emit('clubs:change', res.body);
        callback(null, res.body);
      }.bind(this));
  },
  addClub: function(club, callback) {
    callback = callback || function () {};
    return this.request('post', '/api/clubs/')
      .send(club)
      .accept('json')
      .end(function(err, res) {
        if (err) {
          return callback(err);
        }
        this.updateClubs();
        ga.event({ category: 'Clubs', action: 'Added a Club' });
        callback(null, res.body);
      }.bind(this));
  },
  changeClub: function(club, callback) {
    callback = callback || function () {};
    return this.request('put', club.url)
      .send(club)
      .accept('json')
      .end(function(err, res) {
        if (err) {
          return callback(err);
        }
        this.updateClubs();
        ga.event({ category: 'Clubs', action: 'Edited a Club' });
        callback(null, res.body);
      }.bind(this));
  },
  deleteClub: function(url, callback) {
    callback = callback || function () {};
    return this.request('delete', url)
      .accept('json')
      .end(function(err, res) {
        if (err) {
          return callback(err);
        }
        this.updateClubs();
        ga.event({ category: 'Clubs', action: 'Deleted a Club' });
        callback(null);
      }.bind(this));
  }
});

module.exports = TeachAPI;
