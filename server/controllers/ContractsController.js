const { Contracts, Users } = require('../models');

module.exports = {
    async show(req, res, next) {
        try {
            const contracts = await Contracts.findAll({
                include: [{ model: Users, as: 'employee' }]
            });

            return res.send(contracts);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with getting employees'
            });
        }
    },

    async showContracts(req, res, next) {
        try {
            const contracts = await Contracts.findAll({
                where: {
                    userId: req.params.id
                }
            });

            return res.send(contracts);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with getting contracts '
            });
        }
    },

    async create(req, res, next) {
        // validate: contract_lenght (contract => contract_lenght)
        // validate: start_date, finish_date
        // validate: holidays_per_year (20/26)
        // validate: employee_id

        const holidaysToAdd = ceil((holidays_per_year / 12) * contract_length);

        try {
            const newContract = await Contracts.create(req.body);

            const employee = await Employees.findOne(employee_id);

            await employee.update({ days_left: holidaysToAdd });

            return res.send(newContract);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with adding this contract'
            });
        }
    },
    async update(req, res, next) {
        try {
            await Contracts.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            return res.send(req.body);
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'Something went wrong with updating this contract'
            });
        }
    },

    async delete(req, res, next) {
        try {
            const one = await Contracts.findOne({
                where: {
                    id: req.params.id
                }
            });

            await one.destroy();

            return res.send(one);
        } catch (err) {
            console.err(err);

            return res.status(500).send({
                error: 'Something went wrong with deleting this employee'
            });
        }
    }
};
