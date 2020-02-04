const isEmpty = require('lodash/fp/isEmpty');
const validator = require('validator');

module.exports = function validateRegisterInput({ email, password = '', password2 = '' }) {
  const errors = {};

  if (isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  if (isEmpty(password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  // TODO: better password restrictions?
  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
