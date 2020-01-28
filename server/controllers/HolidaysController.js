const { Users, Holidays } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

module.exports = {
    async show(req, res, next) {
        try {
            const allHolidays = await Holidays.findAll({
                include: [{ model: Users, as: 'employee' }]
            });

            return res.send(allHolidays);
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

        const start = moment(req.body.start_date);
        const finish = moment(req.body.finish_date);

        console.log(req.body.start_date);
        console.log(req.body.finish_date);

        const days_taken =
            Math.abs(moment.duration(start.diff(finish)).asDays()) + 1;

        const employee = await Users.findByPk(req.body.user_id);

        const new_days_left = employee.days_left - days_taken;

        try {
            req.body.days_taken = days_taken;

            const newHolidays = await Holidays.create(req.body);
            await employee.update({ days_left: new_days_left });

            return res.send(newHolidays);
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

        const start = moment(req.body.start_date);
        const finish = moment(req.body.finish_date);

        const new_days_taken =
            Math.abs(moment.duration(start.diff(finish)).asDays()) + 1;

        try {
            req.body.days_taken = new_days_taken;

            const holiday = await Holidays.findByPk(req.params.id);

            if (holiday.confirmed === true) {
                const employee = await Users.findByPk(req.body.user_id);

                const old_days_left = employee.days_left;

                const new_days_left =
                    old_days_left - (new_days_taken - holiday.days_taken);

                await employee.update({ days_left: new_days_left });
            }

            const holidays = await Holidays.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            return res.send(holidays);
        } catch (err) {
            return next(err);
        }
    },

    async confirm(req, res, next) {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map(e => {
                return { message: e.msg, param: e.param };
            });

            return res.status(422).json({ errors });
        }

        try {
            let newDaysLeft;
            const holidays = await Holidays.findByPk(req.params.id);

            await Holidays.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            const employee = await Users.findByPk(holidays.user_id);

            if (req.body.confirmed === true) {
                newDaysLeft = employee.days_left - holidays.days_taken;
            } else {
                newDaysLeft = employee.days_left + holidays.days_taken;
            }

            await employee.update({ days_left: newDaysLeft });

            return res.send(holidays);
        } catch (err) {
            return next(err);
        }
    },

    async delete(req, res, next) {
        try {
            const holidays_to_delete = await Holidays.findByPk(req.params.id);

            if (holidays_to_delete.confirmed === true) {
                const employee = await Users.findOne({
                    where: {
                        id: holidays_to_delete.user_id
                    }
                });

                const old_days_left = employee.days_left;

                const old_days_taken = holidays_to_delete.days_taken;

                const new_days_left = old_days_taken + old_days_left;

                await employee.update({ days_left: new_days_left });
            }

            await holidays_to_delete.destroy();

            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    }
};
