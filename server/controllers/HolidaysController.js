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
            console.error(err);

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
        //update employee days_left
        const days_taken = Math.abs(
            moment.duration(start.diff(finish)).asDays()
        );

        try {
            req.body.days_taken = days_taken;
            const newHolidays = await Holidays.create(req.body);

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

        const days_taken = Math.abs(
            moment.duration(start.diff(finish)).asDays()
        );
        try {
            req.body.days_taken = days_taken;

            const employee = await Users.findByPk(req.body.userId);

            //cases >0 itd...

            const old_days_left = employee.days_left;
            const new_days_left = old_days_left - days_taken;

            await employee.update({ days_left: new_days_left });

            await Holidays.update(req.body, {
                where: {
                    id: req.params.id
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
            const one = await Holidays.findOne({
                where: {
                    id: req.params.id
                }
            });

            await one.destroy();

            return res.send(one);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with deleting this user'
            });
        }
    }
};
