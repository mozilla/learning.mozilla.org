var util = require('../../lib/util');

module.exports = function validateSignupForm(signUpFormState) {
  var errors = [];
  if ( !util.isValidEmail(signUpFormState.email) ) {
    errors.push("Please enter an email address.");
  }
  return errors;
};
