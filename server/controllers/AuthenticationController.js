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
                return res.status(403).send({
                    error: 'The login information was incorrect'
                });
            }

            const isPasswordValid = await userWithPassword.comparePassword(
                password
            );

            if (!isPasswordValid) {
                return res.status(403).send({
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
            next(err);
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

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(
            bearerToken,
            config.authentication.jwtSecret,
            (err, authData) => {
                if (err) {
                    return res.sendStatus(401).json({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                }

                req.loggedUser = authData;

                next();
            }
        );
    },
    async verifyPerson(req, res, next) {
        try {
            const userLogged = await Users.findByPk(req.loggedUser.id);

            if (
                (await userLogged.isUser()) &&
                userLogged.id !== parseInt(req.params.id)
            ) {
                return res.status(403).send({
                    error: 'Access only for admin'
                });
            }

            next();
        } catch (err) {
            return next(err);
        }
    },
    async verifyAdmin(req, res, next) {
        try {
            const adminLogged = await Users.findByPk(req.loggedUser.id);

            if (!(await adminLogged.isAdmin())) {
                return res.status(403).send({
                    error: 'Access only for admin'
                });
            }

            next();
        } catch (err) {
            return next(err);
        }
    }
};
