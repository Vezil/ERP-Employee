const { Users, Holidays } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

module.exports = {
    async show(req, res, next) {
        console.log(req.loggedUser);

        const userLogged = await Users.findByPk(req.loggedUser.id);

        if (userLogged.isAdmin())
            try {
                // const where = {};
                // if (req.loggedUser.isUser()) {
                //  where[user_id] = req.loggedUser.id;
                // }

                const allHolidays = await Holidays.findAll({
                    include: [{ model: Users, as: 'employee' }]
                    // where
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

        const days_taken = Math.abs(
            moment.duration(start.diff(finish)).asDays()
        );

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

        const new_days_taken = Math.abs(
            moment.duration(start.diff(finish)).asDays()
        );

        try {
            req.body.days_taken = new_days_taken;

            const employee = await Users.findByPk(req.body.user_id);

            if (new_days_taken > employee.days_left) {
                return res.status(422).send({
                    error:
                        "This employee doesn't have " +
                        new_days_taken +
                        '  days left'
                });
            }

            const old_days_taken = await Holidays.findByPk(req.params.id);

            const old_days_left = employee.days_left;

            const new_days_left =
                old_days_left - (new_days_taken - old_days_taken.days_taken);

            await employee.update({ days_left: new_days_left });

            await Holidays.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            return res.send(req.body);
        } catch (err) {
            return next(err);
        }
    },

    async delete(req, res, next) {
        try {
            const holidays_to_delete = await Holidays.findByPk(req.params.id);

            const employee = await Users.findOne({
                where: {
                    id: holidays_to_delete.user_id
                }
            });

            const old_days_left = employee.days_left;

            const old_days_taken = holidays_to_delete.days_taken;

            const new_days_left = old_days_taken + old_days_left;

            await employee.update({ days_left: new_days_left });
            await holidays_to_delete.destroy();

            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    }
};
