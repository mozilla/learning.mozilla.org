var TestUtils = require('react-addons-test-utils');
var NewsletterSignupForm = require('../../components/newsletter-signup/SignupForm.jsx');
var stubContext = require('./stub-context.jsx');
var Util = require('../util.js');

describe("Newsletter Signup Form", function() {
  var signupFormIdPrefix = "signup-form-";
  var signupForm;

  beforeEach(function() {
    NewsletterSignupForm.handleSubmit = sinon.spy();
    signupForm = stubContext.render(NewsletterSignupForm, {idPrefix: signupFormIdPrefix});
  });

  afterEach(function() {
    stubContext.unmount(signupForm);
  })

  it("has valid labels", function() {
    Util.ensureLabelLinkage(signupForm, signupFormIdPrefix + 'email');
    Util.ensureLabelLinkage(signupForm, signupFormIdPrefix + 'privacy');
  });

  it("does not show any errors by default", function() {
    TestUtils.scryRenderedDOMComponentsWithClass(signupForm,'error-msg').length.should.equal(0);
  });

  it("shows error message for invalid 'email'", function() {
    signupForm.setState({validationErrorType: 'email'});

    var validationError = TestUtils.findRenderedDOMComponentWithClass(signupForm,'error-msg');
    validationError.textContent.should.match(/Please enter a valid email address./);

  });

  it("shows error message for errors other than invalid email", function() {
    signupForm.setState({validationErrorType: 'other'});
    var validationError = TestUtils.findRenderedDOMComponentWithClass(signupForm,'error-msg');
    validationError.textContent.should.match(/There's been a problem with our system. Please try again later./);
  });

});
