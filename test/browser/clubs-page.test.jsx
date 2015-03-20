var EventEmitter = require('events').EventEmitter;
var should = require('should');
var sinon = window.sinon;
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var StubTeachAPI = require('./stub-teach-api');
var stubContext = require('./stub-context.jsx');
var ClubsPage = require('../../components/clubs-page.jsx');

function ensureFormFieldsDisabledValue(component, isDisabled) {
  var found = 0;

  ['input', 'textarea'].forEach(function(tag) {
    TestUtils.scryRenderedDOMComponentsWithTag(
      component,
      tag
    ).forEach(function(component) {
      found++;
      component.props.disabled.should.equal(isDisabled);
    });
  });

  if (!found) {
    throw new Error("no form fields were found");
  }
}

describe("ClubsPage", function() {
  var clubsPage, teachAPI, xhr;

  beforeEach(function() {
    // The map widget on the clubs page will try to use XHR. We want to
    // fake that so that network issues don't cause this test to fail,
    // and so that PhantomJS doesn't hang on us.
    xhr = sinon.useFakeXMLHttpRequest();

    teachAPI = new StubTeachAPI();
    clubsPage = stubContext.render(ClubsPage, {}, {
      teachAPI: teachAPI
    });
  });

  afterEach(function() {
    stubContext.unmount(clubsPage);
    xhr.restore();
  });

  it('triggers clubs update when mounted', function() {
    teachAPI.updateClubs.callCount.should.equal(1);
  });
});

describe("ClubsPage.ModalAddYourClub", function() {
  var ERROR_REGEX = /an error occurred/i;
  var modal, teachAPI, onSuccess;

  beforeEach(function() {
    onSuccess = sinon.spy();
    modal = stubContext.render(ClubsPage.ModalAddYourClub, {
      onSuccess: onSuccess
    });
    teachAPI = modal.getTeachAPI();
  });

  afterEach(function() {
    stubContext.unmount(modal);
  });

  it("renders", function() {
    modal.getDOMNode().textContent.should.match(/add your club/i);
  });

  it("binds to username:change event", function() {
    EventEmitter.listenerCount(teachAPI, 'username:change').should.eql(1);
  });

  it("shows auth when user is not logged in", function() {
    teachAPI.emit('username:change', null);
    modal.state.step.should.equal(modal.STEP_AUTH);
  });

  it("closes modal when user clicks join btn", function() {
    teachAPI.emit('username:change', null);
    var joinBtn = TestUtils.findRenderedDOMComponentWithClass(
      modal,
      'btn-default'
    );
    modal.context.hideModal.callCount.should.eql(0);
    TestUtils.Simulate.click(joinBtn);
    modal.context.hideModal.callCount.should.eql(1);
  });

  it("starts login when user clicks login on auth step", function() {
    teachAPI.emit('username:change', null);
    var loginBtn = TestUtils.findRenderedDOMComponentWithClass(
      modal,
      'btn-primary'
    );
    teachAPI.startLogin.callCount.should.eql(0);
    TestUtils.Simulate.click(loginBtn);
    teachAPI.startLogin.callCount.should.eql(1);
  });

  it("shows form when user is logged in", function() {
    teachAPI.emit('username:change', 'foo');
    modal.state.step.should.equal(modal.STEP_FORM);
  });

  it("does not show any errors by default", function() {
    teachAPI.emit('username:change', 'foo');
    modal.getDOMNode().textContent.should.not.match(ERROR_REGEX);
  });

  it("enables form inputs by default", function() {
    teachAPI.emit('username:change', 'foo');
    ensureFormFieldsDisabledValue(modal, false);
  });

  describe("when form is submitted", function() {
    var addClubCall, form;

    beforeEach(function() {
      teachAPI.emit('username:change', 'foo');
      modal.setState({
        name: 'blorpy',
        location: 'chicago',
        website: 'http://example.org',
        description: 'this is my club'
      });
      form = TestUtils.findRenderedDOMComponentWithTag(
        modal,
        'form'
      );
      teachAPI.addClub.callCount.should.equal(0);
      TestUtils.Simulate.submit(form);
      teachAPI.addClub.callCount.should.equal(1);
      addClubCall = teachAPI.addClub.getCall(0);
    });

    it("sends data to server", function() {
      addClubCall.args[0].should.eql({
        name: 'blorpy',
        location: 'chicago',
        website: 'http://example.org',
        description: 'this is my club'
      });
    });

    it("disables form fields while server is contacted", function() {
      modal.state.step.should.equal(modal.STEP_WAIT_FOR_NETWORK);
      ensureFormFieldsDisabledValue(modal, true);
    });

    it("shows success result", function() {
      addClubCall.args[1](null, {url: 'http://foo'});
      modal.state.step.should.equal(modal.STEP_SHOW_RESULT);
      modal.state.networkError.should.be.false;
      modal.state.result.should.eql({url: 'http://foo'});
      modal.getDOMNode().textContent
        .should.match(/your club is now displayed on our map/i);
    });

    it("calls onSuccess when user clicks final button", function() {
      addClubCall.args[1](null, {url: 'http://foo'});
      var btn = TestUtils.findRenderedDOMComponentWithClass(
        modal,
        'btn-primary'
      );
      onSuccess.callCount.should.eql(0);
      modal.context.hideModal.callCount.should.eql(0);
      TestUtils.Simulate.click(btn);
      modal.context.hideModal.callCount.should.eql(1);
      onSuccess.callCount.should.eql(1);
      onSuccess.getCall(0).args[0].should.eql({url: 'http://foo'});
    });

    it("returns to form, shows err when network err occurs", function() {
      addClubCall.args[1](new Error());
      modal.state.step.should.equal(modal.STEP_FORM);
      should(modal.state.result).equal(null);
      modal.getDOMNode().textContent.should.match(ERROR_REGEX);
      ensureFormFieldsDisabledValue(modal, false);
    });

    it("removes error message when retrying form submission", function() {
      addClubCall.args[1](new Error());
      modal.state.networkError.should.be.true;
      TestUtils.Simulate.submit(form);
      modal.state.networkError.should.be.false;
      modal.getDOMNode().textContent.should.not.match(ERROR_REGEX);
    });
  });
});

describe("ClubsPage.ModalLearnMore", function() {
  var modal;

  beforeEach(function() {
    modal = stubContext.render(ClubsPage.ModalLearnMore);
  });

  afterEach(function() {
    stubContext.unmount(modal);
  });

  it("renders", function() {
    modal.getDOMNode().textContent.should.match(/learn more/i);
  });
});
