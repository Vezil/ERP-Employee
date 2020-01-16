const { employee, holidays, contracts } = require('../models')

module.exports = {
    async getHolidaysByEmployeeId(req, res, next) {

        const { id } = req.params;

        try {
            const Holidays = await holidays.findAll({
                where: {
                    employeeId: id,
                    confirmed: 1
                }
            });

            res.send(Holidays)
        } catch (err) {
            res.status(500).send({

                error: 'Something went wrong with getting holidays ' + err

            })
        }
    },
    async getEmployeeRequests(req, res, next) {

        const { id } = req.params;

        try {
            const Holidays = await holidays.findAll({
                where: {
                    employeeId: id,
                    confirmed: 0
                }
            });

            res.send(Holidays)
        } catch (err) {
            res.status(500).send({

                error: 'Something went wrong with getting holidays ' + err

            })
        }
    },
    async addHolidaysEmployee(req, res, next) {

        try {
            const newHolidays = await holidays.create(req.body)
            res.send(newHolidays)
        }
        catch (err) {
            res.status(500).send({
                error: 'Something went wrong with adding this contract'
            })
        }
    },
    async editHolidaysEmployee(req, res, next) {

        try {
            await holidays.update(req.body, {
                where: {
                    employeeId: req.params.id,
                    id: req.params.id_holidays,
                }
            })

            res.send(req.body)

        } catch (err) {
            console.log(req.body)
            res.status(500).send({
                error: 'Something went wrong with updating this Holidays (Employee)'
            })
        }
    },
    async deleteHolidaysEmployee(req, res, next) {

        try {
            const one = await holidays.findOne({
                where: {
                    employeeId: req.params.id,
                    id: req.params.id_holidays,
                }
            })

            if (!one) {
                return res.status(403).send({
                    error: `This employee doesn't exist`
                })
            }

            await one.destroy()

            res.send(one)

        } catch (err) {

            res.status(500).send({
                error: 'Something went wrong with deleting this Holidays (Employee)'
            })
        }
    },
}