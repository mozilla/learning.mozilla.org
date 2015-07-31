var should = require('should');
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubContext = require('./stub-context.jsx');
var StubRouter = require('./stub-router');
var EventsPage = require('../../pages/events.jsx');
var Util = require('../util.js');

describe("EventsPage", function() {
  var eventsPage, signupFormBottom;

  beforeEach(function() {
    eventsPage = stubContext.render(EventsPage, {});
    signupFormBottom = stubContext.render(EventsPage.FormMailingListSignup, {idPrefix: "page_end_cta_"});
  });

  afterEach(function() {
    stubContext.unmount(eventsPage);
    stubContext.unmount(signupFormBottom);
  });

  it("shows mailinglist form if ?mailinglist=thanks isn't in query", function() {
    eventsPage.context.showModal.callCount.should.equal(0);
  });

  it("shows mailinglist thank you message if ?mailinglist=thanks is in query", function() {
    var eventsPage2 = stubContext.render(EventsPage, {}, {
      router: new StubRouter({
        currentQuery: {'mailinglist': 'thanks'}
      })
    });
    eventsPage2.context.showModal.callCount.should.equal(1);
    stubContext.unmount(eventsPage2);
  });

  describe("EventsPage.FormMailingListSignup", function() {
    var validateSignupForm = EventsPage.validateSignupForm;

    it("has valid labels for the signup form on page bottom", function() {
      Util.ensureLabelLinkage(signupFormBottom, 'page_end_cta_email');
      Util.ensureLabelLinkage(signupFormBottom, 'page_end_cta_privacy');
    });

    it("does not show any errors by default", function() {
      signupFormBottom.state.validationErrors.length.should.equal(0);
    });

    it("shows form validation errors when 'email' is left blank", function() {
      validateSignupForm( {email: ""} ).should.eql([
        "Please enter an email address."
      ]);
    });

    it("shows error message for invalid 'email'", function() {
      validateSignupForm( {email: "123"} ).should.eql([
        "Please enter an email address."
      ]);
      validateSignupForm( {email: "helloworld.example.com"} ).should.eql([
        "Please enter an email address."
      ]);
      validateSignupForm( {email: "@"} ).should.eql([
        "Please enter an email address."
      ]);
    });

    it("hides form validation error when 'email' is valid", function() {
      validateSignupForm( {email: "hellomofo@example.com"} ).should.eql([]);
    });

  });

});
