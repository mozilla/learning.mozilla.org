var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var urlParse = require('url').parse;
var should = require('should');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var Login = require('../../components/login.jsx');
var LoginLink = require('../../components/login/LoginLink.jsx');
var LogoutLink = require('../../components/login/LogoutLink.jsx');

var stubContext = require('./stub-context.jsx');
var StubTeachAPI = require('./stub-teach-api');
var StubRouter = require('./stub-router');

var ADMIN_RE = /administration/i;

describe("Login", function() {
  var withTeach, login, teachAPI;

  beforeEach(function() {
    teachAPI = new StubTeachAPI();
    withTeach = stubContext.render(Login, {
      teachAPI: teachAPI
    });
    login = withTeach.getComponent();
  });

  afterEach(function() {
    if (login) {
      stubContext.unmount(login);
    }
  });

  it("removes teach API event listeners when unmounted", function() {
    var events = [
      'login:start',
      'login:error',
      'login:success',
      'logout'
    ];

    events.forEach(function(event) {
      EventEmitter.listenerCount(teachAPI, event).should.equal(1);
    });

    stubContext.unmount(login);

    events.forEach(function(event) {
      EventEmitter.listenerCount(teachAPI, event).should.equal(0);
    });

    login = null;
  });

  it("shows username when logged in", function() {
    login.setState({username: "blop"});
    ReactDOM.findDOMNode(login).textContent.should.match(/blop/);
  });

  it("doesn't show admin link for non-staff users", function() {
    login.setState({username: "blop"});
    ReactDOM.findDOMNode(login).textContent.should.not.match(ADMIN_RE);
  });

  it("shows admin link for staff users", function() {
    teachAPI.getAdminURL.returns("http://admin");
    login.setState({username: "blop"});
    ReactDOM.findDOMNode(login).textContent.should.match(ADMIN_RE);
  });

  it("shows 'loading...' when initializing", function() {
    login.setState({loggingIn: true});
    ReactDOM.findDOMNode(login).textContent.should.match(/loading/i);
  });

  it("shows a message when a network error occurs", function() {
    teachAPI.emit('login:error', {});
    ReactDOM.findDOMNode(login).textContent
      .should.match(/unable to contact login server/i);
  });

  it("handles login:success event", function() {
    login.setState({loggingIn: true});
    teachAPI.getUsername.returns("foo");
    teachAPI.emit('login:success');
    login.state.loggingIn.should.be.false;
    login.state.username.should.eql("foo");
  });

  it("handles logout event", function() {
    login.setState({loggingIn: true, username: 'bop'});
    teachAPI.emit('logout');
    login.state.loggingIn.should.be.false;
    should(login.state.username).equal(null);
  });
});

function renderLink(linkClass, props) {
  var teachAPI = new StubTeachAPI();
  teachAPI.baseURL = 'http://teach-api';
  return stubContext.render(linkClass, _.extend({
    teachAPI: teachAPI
  }, props), {
    router: new StubRouter({
      currentPathname: '/path'
    })
  });
}

describe("Login.LoginLink", function() {
  it("should create a link w/ expected callback", function() {
    var link = renderLink(LoginLink, {
      origin: 'http://teach',
      loginBaseURL: 'http://teach-api',
      callbackURL: 'http://teach/path'
    });
    var info = urlParse(ReactDOM.findDOMNode(link).href, true);

    info.protocol.should.eql('http:');
    info.host.should.eql('teach-api');
    info.pathname.should.eql('/auth/oauth2/authorize');
    info.query.action.should.eql('signin');
    info.query.callback.should.eql('http://teach/path');
  });

  it("should accept action='signup'", function() {
    var link = renderLink(LoginLink, {
      action: 'signup',
      loginBaseURL: 'http://teach-api'
    });
    var info = urlParse(ReactDOM.findDOMNode(link).href, true);

    info.query.action.should.eql('signup');
  });

  it("should accept callbackSearch prop", function() {
    var link = renderLink(LoginLink, {
      origin: 'http://teach',
      callbackSearch: '?foo=on',
      loginBaseURL: 'http://teach-api',
      callbackURL: 'http://teach/path'
    });
    var info = urlParse(ReactDOM.findDOMNode(link).href, true);

    info.query.callback.should.eql('http://teach/path?foo=on');
  });
});

describe("Login.LogoutLink", function() {
  it("should create a link w/ expected callback", function() {
    var link = renderLink(LogoutLink, {
      origin: 'http://teach',
      loginBaseURL: 'http://teach-api',
      callbackURL: 'http://teach/path'
    });
    var info = urlParse(ReactDOM.findDOMNode(link).href, true);

    info.protocol.should.eql('http:');
    info.host.should.eql('teach-api');
    info.pathname.should.eql('/auth/oauth2/logout');
    info.query.callback.should.eql('http://teach/path');
  });
});
