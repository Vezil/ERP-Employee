const { Users, Holidays } = require('../models');

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
        try {
            const newHolidays = await Holidays.create(req.body);

            return res.send(newHolidays);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with adding this contract'
            });
        }
    },

    async update(req, res, next) {
        try {
            await Holidays.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            res.send(req.body);
        } catch (err) {
            console.log(req.body);

            res.status(500).send({
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
            res.status(500).send({
                error: 'Something went wrong with deleting this user'
            });
        }
    }
};
