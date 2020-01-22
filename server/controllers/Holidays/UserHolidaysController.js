const { holidays } = require('../../models');
const { validationResult } = require('express-validator');

module.exports = {
    async showHolidays(req, res, next) {
        const { id } = req.params;

        try {
            const Holidays = await holidays.findAll({
                where: {
                    userId: id,
                    confirmed: 1
                }
            });

            res.send(Holidays);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with getting holidays ' + err
            });
        }
    },
    async showRequests(req, res, next) {
        try {
            const Holidays = await holidays.findAll({
                where: {
                    userId: req.params.id,
                    confirmed: 0
                }
            });

            res.send(Holidays);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with getting holidays ' + err
            });
        }
    },
    async create(req, res, next) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const newHolidays = await holidays.create(req.body);
                res.send(newHolidays);
            } catch (err) {
                res.status(500).send({
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
                await holidays.update(req.body, {
                    where: {
                        userId: req.params.id,
                        id: req.params.holidaysId
                    }
                });

                res.send(req.body);
            } catch (err) {
                console.log(req.body);
                res.status(500).send({
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
            const one = await holidays.findOne({
                where: {
                    userId: req.params.id,
                    id: req.params.holidaysId
                }
            });

            if (!one) {
                return res.status(204).send();
            }

            await one.destroy();

            res.send(one);
        } catch (err) {
            res.status(500).send({
                error:
                    'Something went wrong with deleting this Holidays (Employee)'
            });
        }
    }
};
