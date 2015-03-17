var EventEmitter = require('events').EventEmitter;
var should = require('should');
var sinon = window.sinon;
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubRouterContext = require('./stub-router-context.jsx');
var Login = require('../../components/login.jsx');

describe("login", function() {
  var login, teachAPI, username, alerts;

  beforeEach(function() {
    teachAPI = new EventEmitter();
    username = null;
    alerts = [];
    teachAPI.logout = sinon.spy();
    teachAPI.startLogin = sinon.spy();
    teachAPI.getUsername = function() {
      return username;
    };
    login = stubRouterContext.render(Login, {
      teachAPI: teachAPI,
      alert: function(msg) { alerts.push(msg); }
    });
  });

  afterEach(function() {
    if (login) {
      stubRouterContext.unmount(login);
    }
  });

  it("removes teach API event listeners when unmounted", function() {
    var events = [
      'login:error',
      'login:cancel',
      'login:success',
      'logout'
    ];

    events.forEach(function(event) {
      EventEmitter.listenerCount(teachAPI, event).should.equal(1);
    });

    stubRouterContext.unmount(login);

    events.forEach(function(event) {
      EventEmitter.listenerCount(teachAPI, event).should.equal(0);
    });

    login = null;
  });

  it("triggers login when user clicks login link", function() {
    var links = TestUtils.scryRenderedDOMComponentsWithTag(login, 'a');

    // We should have a "create an account link" followed by a
    // "Log in" link.
    links.length.should.equal(2);

    TestUtils.Simulate.click(links[1]);
    teachAPI.startLogin.callCount.should.equal(1);
    login.state.loggingIn.should.be.true;
  });

  it("shows username when logged in", function() {
    login.setState({username: "blop"});
    login.getDOMNode().textContent.should.match(/blop/);
  });

  it("triggers logout when user clicks logout link", function() {
    login.setState({username: "foo"});

    var link = TestUtils.findRenderedDOMComponentWithTag(login, 'a');

    TestUtils.Simulate.click(link);
    teachAPI.logout.callCount.should.equal(1);
  });

  it("shows 'logging in...' when logging in", function() {
    login.setState({loggingIn: true});
    login.getDOMNode().textContent.should.match(/logging in/i);
  });

  it("shows an alert when a network error occurs", function() {
    teachAPI.emit('login:error', {});
    alerts.should.eql(["An error occurred! Please try again later."]);
  });

  it("tells user to make a webmaker account when needed", function() {
    teachAPI.emit('login:error', {hasNoWebmakerAccount: true});
    alerts.length.should.eql(1);
    alerts[0].should.match(/Webmaker account/);
  });

  it("handles login:cancel event", function() {
    login.setState({loggingIn: true});
    teachAPI.emit('login:cancel');
    login.state.loggingIn.should.be.false;
  });

  it("handles login:success event", function() {
    login.setState({loggingIn: true});
    username = "foo";
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
