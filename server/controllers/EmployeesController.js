const { Users, Roles, Holidays, Contracts } = require('../models');
const { validationResult } = require('express-validator');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

const SALT_F = 8;

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
            return next(err);
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
                name: Roles.ROLE_USER,
                user_id: employee.id
            });

            return res.send(employee.toJSON());
        } catch (err) {
            return next(err);
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
            const employee = await Users.findByPk(req.params.id);

            if (!employee) {
                return res
                    .status(404)
                    .json({ error: 'This employee has not been found' });
            }

            if (req.body.password) {
                bcrypt
                    .genSaltAsync(SALT_F)
                    .then(salt =>
                        bcrypt.hashAsync(req.body.password, salt, null)
                    )
                    .then(hash => {
                        req.body.password = hash;

                        Users.update(req.body, {
                            where: {
                                id: req.params.id
                            }
                        });

                        const employeeUpdated = Users.findByPk(req.params.id);

                        return res.send(employeeUpdated);
                    });
            } else {
                await Users.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });

                const employeeUpdated = await Users.findByPk(req.params.id);

                return res.send(employeeUpdated);
            }
        } catch (err) {
            return next(err);
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
                    user_id: req.params.id
                }
            });
            await Holidays.destroy({
                where: {
                    user_id: req.params.id
                }
            });
            await Contracts.destroy({
                where: {
                    user_id: req.params.id
                }
            });

            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    },

    async getOne(req, res, next) {
        try {
            const employee = await Users.findByPk(req.params.id);

            if (!employee) {
                return res
                    .status(404)
                    .json({ error: 'This employee has not been found' });
            }

            return res.send(employee);
        } catch (err) {
            return next(err);
        }
    }
};
