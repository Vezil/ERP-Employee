const { body } = require('express-validator/check');

module.exports = [
    body(['email'])
        .exists()
        .isLength({ min: 5 })
        .isEmail()
        .withMessage('Email is required and min length is 5 chars'),

    body(['password'])
        .exists()
        .isLength({ min: 8 })
        .withMessage('Password is required and min length is 8 chars'),

    body(['birthdate'])
        .exists()
        .isISO8601()
        .toDate()
        .withMessage('Invalid date format')
];
