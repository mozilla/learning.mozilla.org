var NewsletterSignupForm = require('../../components/newsletter-signup/SignupForm.jsx');
var validateSignupForm = require('../../components/newsletter-signup/validateSignupForm.js');

var stubContext = require('./stub-context.jsx');
var Util = require('../util.js');

var GOOD_EMAIL_EXAMPLES = [
  "hello@example.com",
  "hello123@example.com",
  "hello+test@example.com",
  "hello123+test@example.com",
  "hello!@example.com",
  "!@example.com",
  "#!$%&'*+-/=?^_`{}|~@example.org"
];

var BAD_EMAIL_EXAMPLES = [
  "",
  "h.e.llo",
  "h@e@llo@example.com",
  "@example.com",
  "@example.com.",
  "h..ello@examplecom",
  "hello@example..com",
  "hel lo@example.com",
  "@.com",
  "@",
  "hello",
  ".com",
  "."
];

describe("Newsletter Signup Form", function() {
  var signupFormIdPrefix = "signup-form-";
  var signupForm;

  beforeEach(function() {
    signupForm = stubContext.render(NewsletterSignupForm, {idPrefix: signupFormIdPrefix});
  });

  afterEach(function() {
    stubContext.unmount(signupForm);
  });

  it("has valid labels", function() {
    Util.ensureLabelLinkage(signupForm, signupFormIdPrefix + 'email');
    Util.ensureLabelLinkage(signupForm, signupFormIdPrefix + 'privacy');
  });

  it("does not show any errors by default", function() {
    signupForm.state.validationErrors.length.should.equal(0);
  });

  it("shows error message for invalid 'email'", function() {
    BAD_EMAIL_EXAMPLES.forEach(function(email) {
      validateSignupForm( {email: email} ).should.eql([ "Please enter an email address." ]);
    });
  });

  it("hides form validation error when 'email' is valid", function() {
    GOOD_EMAIL_EXAMPLES.forEach(function(email) {
      validateSignupForm( {email: email} ).should.eql([]);
    });
  });
});
