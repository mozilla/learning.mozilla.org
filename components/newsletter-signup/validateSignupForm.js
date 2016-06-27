var validator = require('validator');

module.exports = function validateSignupForm(signUpFormState) {
  var errors = [];
  if ( !validator.isEmail(signUpFormState.email) ) {
    errors.push("Please enter an email address.");
  }
  return errors;
};
