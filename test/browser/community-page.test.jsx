var should = require('should');
var React = require('react');
var TestUtils = require('react-addons-test-utils');

var stubContext = require('./stub-context.jsx');
var StubRouter = require('./stub-router');
var CommunityPage = require('../../pages/community.jsx');

var Util = require('../util.js');

describe("CommunityPage", function() {
  var communityPage, pledgeBtn;

  beforeEach(function() {
    communityPage = stubContext.render(CommunityPage);
    pledgeBtn = TestUtils.scryRenderedDOMComponentsWithClass(communityPage, "icon-button")[0];
  });

  afterEach(function() {
    stubContext.unmount(CommunityPage);
  });

});

describe("CommunityPage.SignupForm", function() {
  var signupForm, validateSignupForm;
  var signupFormIdPrefix = "signup-form-";

  beforeEach(function() {
    signupForm = stubContext.render(CommunityPage.SignupForm, {idPrefix: signupFormIdPrefix});
    validateSignupForm = CommunityPage.validateSignupForm;
  });

  afterEach(function() {
    stubContext.unmount(signupForm);
  })

  it("has valid labels", function() {
    Util.ensureLabelLinkage(signupForm, signupFormIdPrefix + 'email');
    Util.ensureLabelLinkage(signupForm, signupFormIdPrefix + 'privacy');
  });

  it("does not show any errors by default", function() {
    signupForm.state.validationErrors.length.should.equal(0);
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
