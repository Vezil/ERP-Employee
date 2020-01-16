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
    async addHolidaysForEmployee(req, res, next) {

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
}