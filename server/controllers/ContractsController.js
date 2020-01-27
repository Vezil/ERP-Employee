const { Contracts, Users } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
    async show(req, res, next) {
        try {
            const contracts = await Contracts.findAll({
                include: [{ model: Users, as: 'employee' }]
            });

            return res.send(contracts);
        } catch (err) {
            return next(err);
        }
    },

    async showContracts(req, res, next) {
        try {
            const contracts = await Contracts.findAll({
                where: {
                    user_id: req.params.id
                }
            });

            return res.send(contracts);
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

        const holidaysToAdd = Math.ceil(
            (req.body.holidays_per_year / 12) * req.body.contract
        );

        try {
            const newContract = await Contracts.create(req.body);

            const employee = await Users.findByPk(req.body.user_id);

            await employee.update({ days_left: holidaysToAdd });

            return res.send(newContract);
        } catch (err) {
            return next(err);
        }
    },
    async update(req, res, next) {
        const holidaysToChange = Math.ceil(
            (req.body.holidays_per_year / 12) * req.body.contract
        );

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map(e => {
                return { message: e.msg, param: e.param };
            });

            return res.status(422).json({ errors });
        }

        try {
            await Contracts.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            const employee = await Users.findByPk(req.body.user_id);

            await employee.update({ days_left: holidaysToChange });

            return res.send(req.body);
        } catch (err) {
            return next(err);
        }
    },

    async delete(req, res, next) {
        try {
            const one = await Contracts.findOne({
                where: {
                    id: req.params.id
                }
            });

            await one.destroy();

            return res.sendStatus(204);
        } catch (err) {
            console.err(err);
            return next(err);
        }
    }
};
