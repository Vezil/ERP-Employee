const { Users, Roles } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { validationResult } = require('express-validator');

function jwtSignEmployee(employee) {
    const ONE_DAY = 60 * 60 * 24;

    return jwt.sign(employee, config.authentication.jwtSecret, {
        expiresIn: ONE_DAY
    });
}

module.exports = {
    async login(req, res, next) {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map(e => {
                return { message: e.msg, param: e.param };
            });

            return res.status(422).json({ errors });
        }

        try {
            const { email, password } = req.body;

            const userWithPassword = await Users.findOne({
                attributes: ['password'],
                where: {
                    email
                }
            });

            if (!userWithPassword) {
                return res.status(422).send({
                    error: 'The login information was incorrect'
                });
            }

            const isPasswordValid = await userWithPassword.comparePassword(
                password
            );

            if (!isPasswordValid) {
                return res.status(422).send({
                    error: 'The login or pass information was incorrect'
                });
            }

            const user = await Users.findOne({
                where: {
                    email
                },
                include: [{ model: Roles, as: 'Role' }]
            });

            const userJson = user.toJSON();

            return res.send({
                user: userJson,
                token: jwtSignEmployee(userJson)
            });
        } catch (err) {
            return next(err);
        }
    },

    async verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader === 'undefined') {
            return res.sendStatus(403).json({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }

        const token = bearerHeader.split(' ')[1];

        jwt.verify(token, config.authentication.jwtSecret, (err, authData) => {
            if (err) {
                return res.sendStatus(401).json({
                    auth: false,
                    message: 'Failed to authenticate token.'
                });
            }

            req.loggedUser = authData;

            next();
        });
    }
};
