const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChangePasswordInput(data) {
    let errors = {};
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword.toLowerCase() : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';

    if(Validator.isEmpty(data.oldPassword)) {
        errors.password = 'Password is required';
    }

    if(Validator.isEmpty(data.newPassword)) {
        errors.password = 'New Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}