const {getEmployee} = require('../models')


module.exports = {
    async allEmployees(req,res){
        try{
          const employee = getEmployee.findAll({
            limit:10
          })
          res,send(song)

        } catch (err) {
        res.status(500).send({
        error: ''
        })
     }
   },
}