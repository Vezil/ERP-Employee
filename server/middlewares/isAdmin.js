const { Users } = require('../models');

module.exports = {
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
