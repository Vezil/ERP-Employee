const { Users, Roles } = require('../models');

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
            return res.status(500).send({
                error: 'Something went wrong with showing this users'
            });
        }
    },

    async create(req, res, next) {
        try {
            const employee = await Users.create(req.body);

            await Roles.create({
                name: 'user',
                userId: employee.id
            });

            return res.send(employee.toJSON());
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with adding this user'
            });
        }
    },

    async update(req, res, next) {
        // validate: name, email, surname, birthdate

        try {
            await Users.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            return res.send(req.body);
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'Something went wrong with updating this user '
            });
        }
    },

    async delete(req, res, next) {
        try {
            const employee = await Users.findOne({
                where: {
                    id: req.params.id
                }
            });
            const role = await Roles.findOne({
                where: {
                    userId: req.params.id
                }
            });
            const holidays = await Holidays.findAll({
                where: {
                    userId: req.params.id
                }
            });
            const contracts = await Contracts.findAll({
                where: {
                    userId: req.params.id
                }
            });

            await employee.destroy();
            await role.destroy();
            await holidays.destroy();
            await contracts.destroy();

            return res.send(employee);
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'Something went wrong with deleting this user'
            });
        }
    },
    async getOne(req, res, next) {
        try {
            const one = await Users.findByPk(req.params.id);

            return res.send(one);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with id of this user '
            });
        }
    }
};
