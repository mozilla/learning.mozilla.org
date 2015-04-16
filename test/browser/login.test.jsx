var EventEmitter = require('events').EventEmitter;
var urlParse = require('url').parse;
var should = require('should');
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubContext = require('./stub-context.jsx');
var Login = require('../../components/login.jsx');
var LoginLink = Login.LoginLink;
var LogoutLink = Login.LogoutLink;
var StubTeachAPI = require('./stub-teach-api');

describe("Login", function() {
  var login, teachAPI;

  beforeEach(function() {
    teachAPI = new StubTeachAPI();
    login = stubContext.render(Login, {}, {
      teachAPI: teachAPI
    });
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
    login.getDOMNode().textContent.should.match(/blop/);
  });

  it("shows 'loading...' when initializing", function() {
    login.setState({loggingIn: true});
    login.getDOMNode().textContent.should.match(/loading/i);
  });

  it("shows a message when a network error occurs", function() {
    teachAPI.emit('login:error', {});
    login.getDOMNode().textContent
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
  return stubContext.render(linkClass, props, {
    teachAPI: teachAPI,
    getCurrentPathname: function() {
      return '/path';
    }
  });
}

describe("Login.LoginLink", function() {
  it("should create a link w/ expected callback", function() {
    var link = renderLink(LoginLink, {origin: 'http://teach'});
    var info = urlParse(link.getDOMNode().href, true);

    info.protocol.should.eql('http:');
    info.host.should.eql('teach-api');
    info.pathname.should.eql('/auth/oauth2/authorize');
    info.query.action.should.eql('signin');
    info.query.callback.should.eql('http://teach/path');
  });

  it("should accept action='signup'", function() {
    var link = renderLink(LoginLink, {action: 'signup'});
    var info = urlParse(link.getDOMNode().href, true);

    info.query.action.should.eql('signup');
  });

  it("should accept callbackSearch prop", function() {
    var link = renderLink(LoginLink, {
      origin: 'http://teach',
      callbackSearch: '?foo=on'
    });
    var info = urlParse(link.getDOMNode().href, true);

    info.query.callback.should.eql('http://teach/path?foo=on');
  });
});

describe("Login.LogoutLink", function() {
  it("should create a link w/ expected callback", function() {
    var link = renderLink(LogoutLink, {origin: 'http://teach'});
    var info = urlParse(link.getDOMNode().href, true);

    info.protocol.should.eql('http:');
    info.host.should.eql('teach-api');
    info.pathname.should.eql('/auth/oauth2/logout');
    info.query.callback.should.eql('http://teach/path');
  });
});
