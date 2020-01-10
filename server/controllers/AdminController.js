const { employee } = require('../models')


module.exports = {
  async Employees(req, res) {
    try {
      const getEmployee = await employee.findAll({
        // limit: 10
      })
      res.send(getEmployee)

    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong with getting employees'
      })
    }
  },
  async addEmployee(req, res) {

    try {
      const newEmployee = await employee.create(req.body)
      res.send(newEmployee)
    }
    catch (err) {
      res.status(500).send({
        error: 'Something went wrong with adding this employee'
      })
    }
  },
  async oneEmployee(req, res) {

    try {
      const one = await employee.findByPk(req.params.id)
      res.send(one)

    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong with id of this employee '
      })
    }
  },
  async updateEmployee(req, res, next) {
    try {
      await employee.update(req.body, {
        where: {
          id: req.params.id
        }
      })

      // if (!one) {
      //   return res.status(403).send({
      //     error: `This employee doesn't exist`
      //   })
      // }

      res.send(req.body)

    } catch (err) {
      console.log(req.body)
      res.status(500).send({
        error: 'Something went wrong with updating this employee'
      })
    }
  },

  async deleteEmployee(req, res, next) {

    try {
      const one = await employee.findOne({
        where: {
          id: req.params.id
        }
      })

      if (!one) {
        return res.status(403).send({
          error: `This employee doesn't exist`
        })
      }

      // await one.destroy()

      res.send(one)

    } catch (err) {

      res.status(500).send({
        error: 'Something went wrong with deleting this employee'
      })
    }
  },

}