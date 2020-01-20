const { employee, holidays, contracts } = require('../models');

module.exports = {
    async Employees(req, res) {
        try {
            const getEmployee = await employee.findAll({
                where: { isAdmin: false }
            });
            res.send(getEmployee);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with getting employees'
            });
        }
    },
    async addEmployee(req, res) {
        try {
            const newEmployee = await employee.create(req.body);
            res.send(newEmployee);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with adding this employee'
            });
        }
    },
    async oneEmployee(req, res) {
        try {
            const one = await employee.findByPk(req.params.id);
            res.send(one);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with id of this employee '
            });
        }
    },
    async updateEmployee(req, res, next) {
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

    async deleteEmployee(req, res, next) {
        try {
            const one = await employee.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!one) {
                return res.status(403).send({
                    error: `This employee doesn't exist`
                });
            }

            await one.destroy();

            return res.send(one);
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'Something went wrong with deleting this employee'
            });
        }
    },

    async getHolidays(req, res, next) {
        try {
            const allHolidays = await holidays.findAll({
                include: [{ model: employee, as: 'employee' }]
            });

            return res.send(allHolidays);
        } catch (err) {
            console.error(err);

            return res.status(500).send({
                error: 'Something went wrong with getting holidays '
            });
        }
    },

    async addContract(req, res, next) {
        try {
            const newContract = await contracts.create(req.body);

            return res.send(newContract);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with adding this contract'
            });
        }
    },

    async addHolidays(req, res, next) {
        try {
            const newHolidays = await holidays.create(req.body);

            return res.send(newHolidays);
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with adding this contract'
            });
        }
    },

    async getContracts(req, res, next) {
        try {
            const Contracts = await contracts.findAll({
                include: [{ model: employee, as: 'employee' }]
            });

            return res.send(Contracts);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with getting employees'
            });
        }
    },

    async oneEmployeeThroughEmail(req, res, next) {
        try {
            const one = await employee.findOne({
                where: {
                    email: req.params.email
                }
            });

            return res.send(one);

            if (!user) {
                return res.status(403).send({
                    error: 'The email was incorrect'
                });
            }
        } catch (err) {
            return res.status(500).send({
                error: 'Something went wrong with getting employees'
            });
        }
    },

    async updateContract(req, res, next) {
        try {
            await contracts.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            res.send(req.body);
        } catch (err) {
            console.error(err);

            res.status(500).send({
                error: 'Something went wrong with updating this contract'
            });
        }
    },

    async deleteContract(req, res, next) {
        try {
            const one = await contracts.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!one) {
                return res.status(403).send({
                    error: `This employee doesn't exist`
                });
            }

            await one.destroy();

            res.send(one);
        } catch (err) {
            console.err(err);

            res.status(500).send({
                error: 'Something went wrong with deleting this employee'
            });
        }
    },

    async updateHolidays(req, res, next) {
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

    async deleteHolidays(req, res, next) {
        try {
            const one = await holidays.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!one) {
                return res.status(403).send({
                    error: `This employee doesn't exist`
                });
            }

            await one.destroy();

            return res.send(one);
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong with deleting this employee'
            });
        }
    }
};
