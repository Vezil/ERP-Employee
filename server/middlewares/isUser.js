const { Users } = require('../models');

module.exports = {
    async verifyUser(req, res, next) {
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
    }
};
