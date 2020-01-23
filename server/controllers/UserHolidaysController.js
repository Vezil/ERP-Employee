const { Holidays } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
    async showHolidays(req, res, next) {
        try {
            const { id } = req.params;

            const holidays = await Holidays.findAll({
                where: {
                    user_Id: id,
                    confirmed: 1
                }
            });

            return res.send(holidays);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with getting holidays '
            });
        }
    },
    async showRequests(req, res, next) {
        try {
            const holidays = await Holidays.findAll({
                where: {
                    user_Id: req.params.id,
                    confirmed: 0
                }
            });

            return res.send(holidays);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with getting holidays '
            });
        }
    },
    async create(req, res, next) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newHolidays = await Holidays.create(req.body);

                return res.send(newHolidays);
            } catch (err) {
                return res.status(500).send({
                    error: 'Something went wrong with adding this contract'
                });
            }
        } else {
            console.log(errors);
            return res.status(422).json({ errors: errors.array() });
        }
    },
    async update(req, res, next) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                await Holidays.update(req.body, {
                    where: {
                        user_Id: req.params.id,
                        id: req.params.holidaysId
                    }
                });

                return res.send(req.body);
            } catch (err) {
                return res.status(500).send({
                    error:
                        'Something went wrong with updating this Holidays (Employee)'
                });
            }
        } else {
            console.log(errors);
            return res.status(422).json({ errors: errors.array() });
        }
    },
    async delete(req, res, next) {
        try {
            const one = await Holidays.findOne({
                where: {
                    user_Id: req.params.id,
                    id: req.params.holidaysId
                }
            });

            if (!one) {
                return res.status(204).send();
            }

            await one.destroy();

            return res.send(one);
        } catch (err) {
            return res.status(500).send({
                error:
                    'Something went wrong with deleting this Holidays (Employee)'
            });
        }
    }
};
