const { check } = require('express-validator');

module.exports = [
    check('start_date')
        .notEmpty()
        .isLength({ min: 10, max: 10 }),
    check('finish_date')
        .notEmpty()
        .isLength({ min: 10, max: 10 })
];
