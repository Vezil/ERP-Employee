const { Users, Roles } = require('../models');

module.exports = {
    async show(req, res, next) {
        try {
            const employees = await Users.findAll({
                include: [
                    {
                        model: Roles
                    }
                ]
            });

            return res.send(employees);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with showing this users'
            });
        }
    },

    async create(req, res) {
        try {
            const employee = await Users.create(req.body);

            return res.send(employee.toJSON());
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with adding this user'
            });
        }
    },

    async update(req, res, next) {
        try {
            await Users.update(req.body, {
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
            const one = await Users.findByPk(req.params.id);
            res.send(one);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with id of this user '
            });
        }
    }
};
