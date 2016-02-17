var util = require('../../lib/util');

// TODO: this is a really bad email validation, and should probably be removed.
var validateSignupForm = function(signUpFormState) {
  var errors = [];
  if ( !util.isValidEmail(signUpFormState.email) ) {
    errors.push("Please enter an email address.");
  }
  return errors;
};

module.exports = validateSignupForm;
