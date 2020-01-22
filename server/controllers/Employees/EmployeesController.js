const { users } = require('../../models');

module.exports = {
    async show(req, res, next) {
        try {
            const getEmployees = await users.findAll({
                where: { isAdmin: false }
            });
            res.send(getEmployees);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with getting user'
            });
        }
    },
    async create(req, res) {
        try {
            const newEmployee = await users.create(req.body);
            res.send(newEmployee.toJSON());
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with adding this user'
            });
        }
    },

    async update(req, res, next) {
        try {
            await users.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            res.send(req.body);
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'Something went wrong with updating this user '
            });
        }
    },

    async delete(req, res, next) {
        try {
            const one = await users.findOne({
                where: {
                    id: req.params.id
                }
            });

            await one.destroy();

            return res.send(one);
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'Something went wrong with deleting this user'
            });
        }
    },
    async getOne(req, res) {
        try {
            const one = await user.findByPk({
                where: {
                    id: req.params.id
                },
                include: [{ model: roles, as: 'role' }]
            });
            res.send(one);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with id of this user '
            });
        }
    }
};
