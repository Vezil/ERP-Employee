const { users, holidays } = require('../../models');

module.exports = {
    async show(req, res, next) {
        try {
            const allHolidays = await holidays.findAll({
                include: [{ model: users, as: 'user' }]
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
            const newHolidays = await holidays.create(req.body);

            return res.send(newHolidays);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with adding this contract'
            });
        }
    },

    async update(req, res, next) {
        try {
            await holidays.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            res.send(req.body);
        } catch (err) {
            console.log(req.body);

            res.status(500).send({
                error: 'Something went wrong with updating holidays ' + err
            });
        }
    },

    async delete(req, res, next) {
        try {
            const one = await holidays.findOne({
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
