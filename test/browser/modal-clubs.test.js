var EventEmitter = require('events').EventEmitter;

var should = require('should');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var stubContext = require('./stub-context.jsx');
var _ = require('underscore');

var ModalAddOrChangeYourClub = require('../../components/modal-clubs.jsx');
var Util = require('../util.js');

var MODAL_ERROR_REGEX = /an error occurred/i;

function ensureFormFieldsDisabledValue(component, isDisabled) {
  var found = 0;

  ['input', 'textarea'].forEach(function(tag) {
    TestUtils.scryRenderedDOMComponentsWithTag(
      component,
      tag
    ).forEach(function(component) {
      found++;
      ReactDOM.findDOMNode(component).disabled.should.equal(isDisabled);
    });
  });

  if (!found) {
    throw new Error("no form fields were found");
  }
}

describe("ModalClubsGeneral", function() {
  var modal, teachAPI, onSuccess;

  beforeEach(function() {
    onSuccess = sinon.spy();
    modal = null;
  });

  afterEach(function() {
    if (modal) {
      stubContext.unmount(modal);
    }
  });

  describe("adding a club", function() {
    beforeEach(function() {
      modal = stubContext.render(ModalAddOrChangeYourClub, {
        onSuccess: onSuccess
      });
      teachAPI = modal.getTeachAPI();
    });

    it("renders", function() {
      ReactDOM.findDOMNode(modal).textContent.should.match(/add your club/i);
    });

    it("binds to username:change event", function() {
      EventEmitter.listenerCount(teachAPI, 'username:change').should.eql(1);
    });

    it("shows auth when user is not logged in", function() {
      teachAPI.emit('username:change', null);
      modal.state.step.should.equal(modal.STEP_AUTH);
    });

    it("shows form when user is logged in", function() {
      teachAPI.emit('username:change', 'foo');
      modal.state.step.should.equal(modal.STEP_FORM);
    });

    it("shows form validation errors", function() {
      teachAPI.emit('username:change', 'foo');
      modal.setState({validationErrors: ["U SUK"]});
      ReactDOM.findDOMNode(modal).textContent.should.match(/U SUK/);
    });

    it("does not show any errors by default", function() {
      teachAPI.emit('username:change', 'foo');
      ReactDOM.findDOMNode(modal).textContent.should.not.match(MODAL_ERROR_REGEX);
    });

    it("enables form inputs by default", function() {
      teachAPI.emit('username:change', 'foo');
      ensureFormFieldsDisabledValue(modal, false);
    });

    it("has valid labels for form elements", function() {
      teachAPI.emit('username:change', 'foo');

      Util.ensureLabelLinkage(modal, 'ModalAddOrChangeYourClub_name');
      Util.ensureLabelLinkage(modal, 'ModalAddOrChangeYourClub_website');
      Util.ensureLabelLinkage(modal, 'ModalAddOrChangeYourClub_description');
    });

    it("handles location changes containing JSON", function() {
      modal.handleLocationChange(JSON.stringify({
        location: 'foo',
        longitude: 35,
        latitude: 24
      }));
      modal.state.location.should.eql('foo');
      modal.state.longitude.should.equal(35);
      modal.state.latitude.should.equal(24);
    });

    it("handles location changes not containing JSON", function() {
      modal.handleLocationChange('');
      modal.state.location.should.eql('');
      should(modal.state.longitude).equal(null);
      should(modal.state.latitude).equal(null);
    });

    it("requires user to read fact sheet", function() {
      teachAPI.emit('username:change', 'foo');
      TestUtils.Simulate.submit(TestUtils.findRenderedDOMComponentWithTag(
        modal, 'form'
      ));
      modal.state.validationErrors
        .should.containEql('You must read the Mozilla Clubs Fact Sheet.');
    });

    it("reports validation errors, aborts form submission", function() {
      modal.state.validationErrors.should.eql([]);
      teachAPI.emit('username:change', 'foo');
      TestUtils.Simulate.submit(TestUtils.findRenderedDOMComponentWithTag(
        modal, 'form'
      ));
      modal.state.validationErrors.length.should.not.equal(0);
      teachAPI.addClub.callCount.should.equal(0);
    });

    describe("when form is submitted", function() {
      return;

      // FIXME: THESE TESTS CANNOT RUN PROPERLY, THERE IS ALL KINDS OF
      //        ASYNC MADNESS GOING ON.
      //        See Github Issue https://github.com/mozilla/teach.mozilla.org/issues/1497
      var addClubCall, form;

      beforeEach(function() {
        teachAPI.emit('username:change', 'foo');
        modal.setState({
          validationErrors: ['old error that should be removed'],
          name: 'blorpy',
          location: 'chicago',
          website: 'example.org',
          description: 'this is my club',
          hasReadFactSheet: true
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

      it("removes old validation errors", function() {
        modal.state.validationErrors.should.eql([]);
      });

      it("sends data to server", function() {
        addClubCall.args[0].should.eql({
          name: 'blorpy',
          location: 'chicago',
          website: 'http://example.org',
          description: 'this is my club',
          latitude: null,
          longitude: null
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
        ReactDOM.findDOMNode(modal).textContent
          .should.match(/thanks for your interest/i);
      });

      it("calls onSuccess when user clicks final button", function() {
        addClubCall.args[1](null, {url: 'http://foo'});
        var btn = TestUtils.findRenderedDOMComponentWithClass(
          modal,
          'btn'
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
        ReactDOM.findDOMNode(modal).textContent.should.match(MODAL_ERROR_REGEX);
        ensureFormFieldsDisabledValue(modal, false);
      });

      it("removes error message when retrying form submission", function() {
        addClubCall.args[1](new Error());
        modal.state.networkError.should.be.true;
        TestUtils.Simulate.submit(form);
        modal.state.networkError.should.be.false;
        ReactDOM.findDOMNode(modal).textContent.should.not.match(MODAL_ERROR_REGEX);
      });
    });
  });

  describe("changing a club", function() {
    var club = {
      url: 'http://example.org/api/clubs/1/',
      name: 'blah',
      description: 'my club',
      location: 'somewhere',
      website: 'http://boop.com',
      latitude: 42,
      longitude: 8
    };

    beforeEach(function() {
      modal = stubContext.render(ModalAddOrChangeYourClub, {
        club: club,
        onSuccess: onSuccess
      });
      teachAPI = modal.getTeachAPI();
      teachAPI.emit('username:change', 'foo');
    });

    it("renders", function() {
      ReactDOM.findDOMNode(modal).textContent.should.match(/change your club/i);
    });

    it("populates state with club values", function() {
      modal.state.name.should.eql("blah");
      modal.state.description.should.eql("my club");
      modal.state.location.should.eql("somewhere");
      modal.state.website.should.eql("http://boop.com");
    });

    describe("when form is submitted", function() {
      var changeClubCall, form;

      beforeEach(function() {
        modal.setState({
          name: 'changed blah',
        });
        form = TestUtils.findRenderedDOMComponentWithTag(
          modal,
          'form'
        );
        teachAPI.changeClub.callCount.should.equal(0);
        TestUtils.Simulate.submit(form);
        teachAPI.changeClub.callCount.should.equal(1);
        changeClubCall = teachAPI.changeClub.getCall(0);
      });

      it("sends data to server", function() {
        changeClubCall.args[0].should.eql({
          url: 'http://example.org/api/clubs/1/',
          name: 'changed blah',
          description: 'my club',
          location: 'somewhere',
          website: 'http://boop.com',
          latitude: 42,
          longitude: 8
        });
      });

      it("shows success result", function() {
        changeClubCall.args[1](null, club);
        ReactDOM.findDOMNode(modal).textContent
          .should.match(/your club has been changed/i);
      });
    });
  });
});

describe("ModalAddOrChangeYourClub.normalizeClub", function() {
  var normalizeClub = ModalAddOrChangeYourClub.normalizeClub;

  it("prepends http:// to website if needed", function() {
    normalizeClub({website: 'foo'}).website.should.eql('http://foo');
  });

  it("doesn't change website if it is blank", function() {
    normalizeClub({website: ''}).website.should.eql('');
  });

  it("doesn't change website if it has http://", function() {
    normalizeClub({website: 'http://foo'}).website.should.eql('http://foo');
  });

  it("doesn't change website if it has https://", function() {
    normalizeClub({website: 'https://fo'}).website.should.eql('https://fo');
  });
});

describe("ModalAddOrChangeYourClub.validateClub", function() {
  var validateClub = ModalAddOrChangeYourClub.validateClub;

  function club(info) {
    return _.extend({
      name: 'blah',
      description: 'blah',
      location: 'blah'
    }, info);
  }

  it("reports no errors when club is valid", function() {
    validateClub(club()).should.eql([]);
  });

  it("fails when name is blank", function() {
    validateClub(club({name: ''})).should.eql([
      "You must provide a name for your club."
    ]);
  });

  it("fails when description is blank", function() {
    validateClub(club({description: ''})).should.eql([
      "You must provide a description for your club."
    ]);
  });

  it("fails when location is blank", function() {
    validateClub(club({location: ''})).should.eql([
      "You must provide a location for your club."
    ]);
  });

  it("fails when website is malformed", function() {
    validateClub(club({website: 'http://foo'})).should.eql([
      "Your club's website must be a valid URL."
    ]);
  });
});
