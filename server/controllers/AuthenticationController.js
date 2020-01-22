const { Users, Roles } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');

function jwtSignEmployee(employee) {
    const ONE_DAY = 60 * 60 * 24;
    return jwt.sign(employee, config.authentication.jwtSecret, {
        expiresIn: ONE_DAY
    });
}

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({
                where: {
                    email: email
                },
                include: [{ model: Roles, as: 'Role' }]
            });

            if (!user) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                });
            }

            const PasswordValid = await user.comparePassword(password);

            if (!PasswordValid) {
                return res.status(403).send({
                    error: 'The login information was incorrect pass '
                });
            }

            const userJson = user.toJSON();

            return res.send({
                user: userJson,
                token: jwtSignEmployee(userJson)
            });
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'This credenctials are incorrect. Try Again!'
            });
        }
    },
    async verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;

            jwt.verify(
                bearerToken,
                config.authentication.jwtSecret,
                (err, authData) => {
                    if (err) {
                        return res.sendStatus(403).json({
                            auth: false,
                            message: 'Failed to authenticate token.'
                        });
                    }
                    next();
                }
            );
        } else {
            return res.sendStatus(403).json({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }
    }
};
