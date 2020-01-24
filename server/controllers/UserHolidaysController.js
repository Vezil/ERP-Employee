const { Holidays, Users } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

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
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map(e => {
                return { message: e.msg, param: e.param };
            });

            return res.status(422).json({ errors });
        }

        const start = moment(req.body.start_date);
        const finish = moment(req.body.finish_date);

        const days_taken = Math.abs(
            moment.duration(start.diff(finish)).asDays()
        );

        const employee = await Users.findByPk(req.body.user_id);
        const new_days_left = employee.days_left - days_taken;

        if (days_taken > employee.days_left) {
            return res.status(422).send({
                error: "You doesn't have " + days_taken + '  days left'
            });
        }

        try {
            req.body.days_taken = days_taken;

            const newHolidays = await Holidays.create(req.body);
            await employee.update({ days_left: new_days_left });

            return res.send(newHolidays);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with adding this holidays'
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

        const start = moment(req.body.start_date);
        const finish = moment(req.body.finish_date);

        const new_days_taken = Math.abs(
            moment.duration(start.diff(finish)).asDays()
        );

        try {
            req.body.days_taken = new_days_taken;

            const employee = await Users.findByPk(req.body.user_id);

            const old_days_taken = await Holidays.findByPk(
                req.params.holidays_id
            );

            if (new_days_taken > employee.days_left) {
                return res.status(422).send({
                    error: "You doesn't have " + new_days_taken + '  days left'
                });
            }

            const old_days_left = employee.days_left;

            const new_days_left =
                old_days_left - (new_days_taken - old_days_taken.days_taken);

            await employee.update({ days_left: new_days_left });

            await Holidays.update(req.body, {
                where: {
                    user_Id: req.params.id,
                    id: req.params.holidays_id
                }
            });

            return res.send(req.body);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with updating holidays '
            });
        }
    },
    async delete(req, res, next) {
        try {
            console.log(req.body);
            const employee = await Users.findOne({
                where: {
                    id: req.params.id
                }
            });

            const old_days_left = employee.days_left;

            const holidays_to_delete = await Holidays.findOne({
                where: {
                    user_Id: req.params.id,
                    id: req.params.holidays_id
                }
            });

            const old_days_taken = holidays_to_delete.days_taken;

            const new_days_left = old_days_taken + old_days_left;

            await employee.update({ days_left: new_days_left });

            await holidays_to_delete.destroy();

            return res.sendStatus(204);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with deleting this user '
            });
        }
    }
};
