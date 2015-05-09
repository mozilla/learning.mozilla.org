var should = require('should');
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubContext = require('./stub-context.jsx');
var StubRouter = require('./stub-router');
var EventsPage = require('../../pages/events.jsx');

describe("EventsPage", function() {
  var eventsPage, signupFormComponent;

  beforeEach(function() {
    eventsPage = stubContext.render(EventsPage, {});
    signupFormComponent = stubContext.render(EventsPage.FormMailingListSignup, {});
  });

  afterEach(function() {
    stubContext.unmount(eventsPage);
    stubContext.unmount(signupFormComponent);
  });

  it("shows mailinglist form if ?mailinglist=thanks isn't in query", function() {
    TestUtils.scryRenderedDOMComponentsWithClass(eventsPage,"thank-you-message").length.should.equal(0);
    TestUtils.scryRenderedComponentsWithType(eventsPage,EventsPage.FormMailingListSignup).length.should.equal(1);
  });

  it("shows mailinglist thank you message if ?mailinglist=thanks is in query", function() {
    var eventsPage2 = stubContext.render(EventsPage, {}, {
      router: new StubRouter({
        currentQuery: {'mailinglist': 'thanks'}
      })
    });
    TestUtils.scryRenderedDOMComponentsWithClass(eventsPage2,"thank-you-message").length.should.equal(1);
    TestUtils.scryRenderedComponentsWithType(eventsPage2,EventsPage.FormMailingListSignup).length.should.equal(0);
    stubContext.unmount(eventsPage2);
  });

  describe("mailnglistForm", function() {
    var validateSignupForm = EventsPage.validateSignupForm;

    it("does not show any errors by default", function() {
      signupFormComponent.state.validationErrors.length.should.equal(0);
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
