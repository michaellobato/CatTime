const isEmpty = require('lodash/fp/isEmpty');
const validator = require('validator');

module.exports = function validateLoginInput({ email = '', password = '' }) {
  const errors = {};

  if (validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (isEmpty(password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
