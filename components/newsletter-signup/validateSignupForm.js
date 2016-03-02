var util = require('../../lib/util');

// TODO: this is a really bad email validation, and should probably be removed.
module.exports = function validateSignupForm(signUpFormState) {
  var errors = [];
  if ( !util.isValidEmail(signUpFormState.email) ) {
    errors.push("Please enter an email address.");
  }
  return errors;
};
