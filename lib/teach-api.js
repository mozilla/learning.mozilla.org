var EventEmitter = require('events').EventEmitter;
var util = require('util');
var url = require('url');
var urlResolve = url.resolve;
var _ = require('underscore');
var request = require('superagent');
var ga = require('react-ga');

var STORAGE_KEY = 'TEACH_API_LOGIN_INFO';

function generateRandom(charnum) {
  charnum = charnum || 12;
  var character = String.fromCharCode(0x41 + Math.random() * 25);
  var tail = (charnum === 1) ? '' : generateRandom(charnum - 1);
  return (Math.random() > 0.5 ? character.toLowerCase() : character.toUpperCase()) + tail;
}

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

  // The first half of the oauth2 login work flow:
  //
  // Form an oauth2 URL that users can be redirected to, which will eventually
  // lead to continueLogin being called when the oauth2 service is done handling
  // the authentication and remote login of the user.
  startLogin: function() {
    var state = generateRandom();
    try {
      window.sessionStorage.setItem('oauth2_token', state);
    } catch (securityError) {
      console.warn('window.sessionStorage is not available, attempting document.cookie fallback...');
      document.cookie = 'oauth2_token=' + state;
    }

    if (document.cookie.indexOf('oauth2_token=' + state) === -1) {
      console.error('document.cookie fallback failed. Login will be unable to complete successfully!');
    }

    // We redirect the user to the oauth2 login service on id.webmaker.org, which
    // will take care off the magic for us. This will eventually call us back by
    // redirecting the user back to teach.wmo/oauth2/callback, which is a page that
    // can accept login credentials, compare the token to the one we saved to
    // window.sessionStorage['oauth2_token'], and then call the teach-API for local
    // log in to the actual teach-relevant bits of the site.

    window.location = url.format({
      protocol: 'https',
      host: 'id.webmaker.org/login/oauth/authorize',
      query: {
        client_id: 'test',
        response_type: 'code',
        scopes: 'user',
        state: state
      }
    });
  },

  // The second half of the oauth2 work flow:
  //
  // This function is used to process the oauth2 login callback, when the login
  // server on id.wmo redirects to teach.wmo/oauth2/callback
  continueLogin: function() {
    // grab the url parameters sent by the oauth2 service
    var parsed = url.parse(window.location.toString());
    var params = parsed.query;

    // for the oauth callback, there are three values we are interested in:
    var clientId = params.client_id;
    var code      = params.code;
    var state     = params.state;

    var correctState = false;

    try {
      correctState = window.sessionStorage.setItem('oauth2_token', state);
    } catch (securityError) {
      console.warn('window.sessionStorage is not available, attempting to read from document.cookie...');
      correctState = document.cookie.toString().indexOf('oauth2_token=' + state) > -1;
    }

    // foremost, the client_id and "state" value (which we invented during startLogin)
    // needs to match. Otherwise, this is not a genuine callback.
    if (clientId === 'test' && correctState) {
      // genuine call: we now call the teach-api with this information so that
      // it can do server <-> server communication with id.wmo to verify that
      // the code that we got in the callback is indeed a real auth code.
      request
      .post(this.baseURL + '/auth')
      .type('form')
      .send({ code: code })
      .end(function(err, res) {
        if (err) {
          err.hasNoWebmakerAccount = (
            err.response && err.response.forbidden &&
            err.response.text == 'invalid authorization code'
          );
          return this.emit('login:error', err);
        }
        // TODO: Handle a thrown exception here.
        this.storage[STORAGE_KEY] = JSON.stringify(res.body);
        this.emit('username:change', res.body.username);
        this.emit('login:success', res.body);
      }.bind(this));
    }

    // cleanup after login, regardless of whether it succeeded or not
    try {
      window.sessionStorage.removeItem('oauth2_token');
    } catch (securityError) {
      document.cookie = 'oauth2_token=false';
    }
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
