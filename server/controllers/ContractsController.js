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
                error: 'Something went wrong with getting contracts ' + err
            });
        }
    },
    async create(req, res, next) {
        try {
            const newContract = await contracts.create(req.body);

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
