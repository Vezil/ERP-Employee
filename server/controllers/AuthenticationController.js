const {employee} = require('../models')

module.exports = {
    async create(req,res){
        try{
        const newEmployee = await employee.create(req.body)
        res.send(newEmployee.toJSON())

        } catch (err) {
        res.status(400).send({
        error: 'This credenctials are incorrect'
        })
     }
   }
}