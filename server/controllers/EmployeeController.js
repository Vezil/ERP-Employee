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
}