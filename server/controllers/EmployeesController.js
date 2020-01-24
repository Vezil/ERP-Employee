const { Users, Roles, Holidays, Contracts } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
    async show(req, res, next) {
        try {
            const employees = await Users.findAll({
                include: [
                    {
                        model: Roles,
                        where: { name: 'user' }
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

    async create(req, res, next) {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map(e => {
                return { message: e.msg, param: e.param };
            });

            return res.status(422).json({ errors });
        }

        try {
            const employee = await Users.create(req.body);

            await Roles.create({
                name: 'user',
                userId: employee.id
            });

            return res.send(employee.toJSON());
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with adding this user '
            });
        }
    },

    async update(req, res, next) {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map(e => {
                return { message: e.msg, param: e.param };
            });

            return res.status(422).json({ errors });
        }

        try {
            await Users.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            return res.send(req.body);
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'Something went wrong with updating this user '
            });
        }
    },

    async delete(req, res, next) {
        try {
            await Users.destroy({
                where: {
                    id: req.params.id
                }
            });
            await Roles.destroy({
                where: {
                    userId: req.params.id
                }
            });
            await Holidays.destroy({
                where: {
                    userId: req.params.id
                }
            });
            await Contracts.destroy({
                where: {
                    userId: req.params.id
                }
            });

            return res.sendStatus(204);
        } catch (err) {
            console.error(err);
            // return next(err)
            return res.status(500).send({
                error: 'Something went wrong with deleting this user'
            });
        }
    },
    async getOne(req, res, next) {
        try {
            const one = await Users.findByPk(req.params.id);

            return res.send(one);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with id of this user '
            });
        }
    }
};
