var should = require('should');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var stubContext = require('./stub-context.jsx');

var ModalRemoveYourClub = require('../../components/modal-clubs-remove.jsx');

var MODAL_ERROR_REGEX = /an error occurred/i;

describe("ModalRemoveYourClub", function() {
  var modal, teachAPI;

  beforeEach(function() {
    modal = stubContext.render(ModalRemoveYourClub, {
      name: 'my club',
      url: 'http://clubs/1/'
    });
    teachAPI = modal.getTeachAPI();
  });

  afterEach(function() {
    if (modal) {
      stubContext.unmount(modal);
    }
  });

  it("renders", function() {
    ReactDOM.findDOMNode(modal).textContent.should.match(/remove your club/i);
  });

  it("does not show any errors by default", function() {
    ReactDOM.findDOMNode(modal).textContent.should.not.match(MODAL_ERROR_REGEX);
  });

  describe("when confirm button is clicked", function() {
    var deleteClubCall, btn;

    beforeEach(function() {
      btn = TestUtils.findRenderedDOMComponentWithClass(
        modal,
        'btn'
      );
      btn.props.disabled.should.be.false;
      teachAPI.deleteClub.callCount.should.equal(0);
      TestUtils.Simulate.click(btn);
      teachAPI.deleteClub.callCount.should.equal(1);
      deleteClubCall = teachAPI.deleteClub.getCall(0);
    });

    it("sends data to server", function() {
      deleteClubCall.args[0].should.eql('http://clubs/1/');
    });

    it("disables confirm button while server is contacted", function() {
      modal.state.step.should.equal(modal.STEP_WAIT_FOR_NETWORK);
      btn.props.disabled.should.be.true;
    });

    it("shows success result", function() {
      deleteClubCall.args[1](null, {url: 'http://foo'});
      modal.state.step.should.equal(modal.STEP_SHOW_RESULT);
      modal.state.networkError.should.be.false;
      ReactDOM.findDOMNode(modal).textContent
        .should.match(/your club has been removed/i);
    });

    it("returns to form, shows err when network err occurs", function() {
      deleteClubCall.args[1](new Error());
      modal.state.step.should.equal(modal.STEP_CONFIRM);
      ReactDOM.findDOMNode(modal).textContent.should.match(MODAL_ERROR_REGEX);
      btn.props.disabled.should.be.false;
    });

    it("removes error message when retrying deletion", function() {
      deleteClubCall.args[1](new Error());
      modal.state.networkError.should.be.true;
      TestUtils.Simulate.click(btn);
      modal.state.networkError.should.be.false;
      ReactDOM.findDOMNode(modal).textContent.should.not.match(MODAL_ERROR_REGEX);
    });
  });
});
