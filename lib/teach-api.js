var EventEmitter = require('events').EventEmitter;
var util = require('util');
var urlResolve = require('url').resolve;
var _ = require('underscore');
var request = require('superagent');
var ga = require('react-ga');

var STORAGE_KEY = 'TEACH_API_LOGIN_INFO';

// emulation settings, to bypass the teach-api
var emulateLogin = !!process.env.LOGIN_EMULATION;
var emulateLoggedOut = !!process.env.LOGIN_EMULATION_LOGGEDOUT;
var emulateUsername = process.env.LOGIN_EMULATION_USERNAME || 'testuser';

function autobind(obj) {
  var prototypes = [].slice.call(arguments, 1);

  prototypes.forEach(function(prototype) {
    Object.keys(prototype).filter(function(propName) {
      return typeof obj[propName] === 'function';
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
  this._clubsUpdateReq = null;
  this.on('username:change', function() {
    // The user changed, so if anyone is interested in clubs, we should
    // automatically update those, since we don't want the old
    // user's private clubs to be shown to the new user.
    if (this.listeners('clubs:change').length) {
      this.updateClubs();
    }
  }.bind(this));
}

TeachAPI.getDefaultURL = function() {
  return process.env.TEACH_API_URL || 'https://teach-api-staging.herokuapp.com';
};

util.inherits(TeachAPI, EventEmitter);

_.extend(TeachAPI.prototype, {
  logout: function() {
    var currentUsername = this.getUsername();

    delete this.storage[STORAGE_KEY];

    if (currentUsername !== null) {
      this.emit('username:change', null);
    }
    this.emit('logout');
  },
  getLoginInfo: function() {
    try {
      var logindata = this.storage[STORAGE_KEY];

      return JSON.parse(logindata);
    } catch (e) {
      return null;
    }
  },
  getAdminURL: function() {
    if (emulateLogin) {
      return false;
    }

    var info = this.getLoginInfo();

    return info && (info.admin_url || null);
  },
  getUsername: function() {
    if (emulateLogin) {
      return emulateLoggedOut ? null : emulateUsername;
    }

    var info = this.getLoginInfo();

    return info && (info.username || null);
  },
  checkLoginStatus: function(onLoginStatusChecked) {
    this.emit('login:start');

    if (emulateLogin) {
      var body = { username: emulateLoggedOut ? null : emulateUsername };

      this.storage[STORAGE_KEY] = JSON.stringify(body);
      this.emit('login:success', body);
      onLoginStatusChecked();
      return;
    }

    request.get(this.baseURL + '/auth/status')
      .withCredentials()
      .accept('json')
      .end(function(err, res) {
        var currentUsername;

        if (err) {
          this.emit('login:error', err);
          return;
        }

        if (res.body.username) {
          currentUsername = this.getUsername();
          // TODO: Handle a thrown exception here.
          this.storage[STORAGE_KEY] = JSON.stringify(res.body);

          if (res.body.username !== currentUsername) {
            this.emit('username:change', res.body.username);
          }
          this.emit('login:success', res.body);
        } else {
          this.logout();
        }
        onLoginStatusChecked();
      }.bind(this));
  },
  request: function(method, path) {
    if (emulateLogin) {
      return {
        accept: function() {
          return {
            end: function(fn) {
              fn(false, { body: ''});
            }
          };
        }
      };
    }

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

    // do we need credentials + Django CSRF token?
    if (['post','put','delete'].indexOf(method) > -1) {
      var csrf = document.cookie.match(/csrftoken=\S+/);

      if (csrf) {
        csrf = csrf[0].replace(';','').split('=');
        var token = csrf[1];

        req.set('X-CSRFtoken', token ? token : "FALSE");
        req.withCredentials();
      }
    }

    return req;
  },
  getClubs: function() {
    return this._clubs;
  },
  updateClubs: function(callback) {
    callback = callback || function () {};
    if (this._clubsUpdateReq) {
      this._clubsUpdateReq.abort();
    }
    this._clubsUpdateReq = this.request('get', '/api/clubs/')
      .accept('json')
      .end(function(err, res) {
        this._clubsUpdateReq = null;
        if (err) {
          return callback(err);
        }
        this._clubs = res.body;
        this.emit('clubs:change', res.body);
        callback(null, res.body);
      }.bind(this));
    return this._clubsUpdateReq;
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
  },
  getClubsGuides: function(callback) {
    callback = callback || function () {};
    return this.request('get', '/api/clubsguides/categories?expand=clubsguides')
      .accept('json')
      .end(callback);
  }
});

module.exports = TeachAPI;
