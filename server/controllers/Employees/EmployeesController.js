const { employee } = require('../../models');

module.exports = {
    async show(req, res, next) {
        try {
            const getEmployees = await employee.findAll({
                where: { isAdmin: false }
            });
            res.send(getEmployees);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with getting employees'
            });
        }
    },
    async create(req, res) {
        try {
            const newEmployee = await employee.create(req.body);
            res.send(newEmployee.toJSON());
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with adding this employee'
            });
        }
    },

    async update(req, res, next) {
        try {
            await employee.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            res.send(req.body);
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'Something went wrong with updating this employee ' + err
            });
        }
    },

    async delete(req, res, next) {
        try {
            const one = await employee.findOne({
                where: {
                    id: req.params.id
                }
            });

            await one.destroy();

            return res.send(one);
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'Something went wrong with deleting this employee'
            });
        }
    },
    async getOne(req, res) {
        try {
            const one = await employee.findByPk(req.params.id);
            res.send(one);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with id of this employee '
            });
        }
    }
};
