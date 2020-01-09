const { employee } = require('../models')


module.exports = {
  async allEmployees(req, res) {
    try {
      const getEmployee = await employee.findAll({
        // limit: 10
      })
      res.send(getEmployee)

    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong'
      })
    }
  },
}