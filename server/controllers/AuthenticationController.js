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
   },
   async login(req,res){
    try{
    const {name,surname} = req.body
    const user = await employee.findOne({
      where:{
        name:name
      }
    })
    if(!user) {
     return res.status(403).send({
        error:'The login information was incorrect'
      })
    }
    // const PasswordValid = password === employee.password
    // if(!PasswordValid){
    //   return res.status(403).send({
    //     error:'The login information was incorrect'
    //   })
    // }
    const userJson = employee.toJSON()
    res.send({
      user: userJson
    })

    } catch (err) {
    res.status(500).send({
    error: 'This credenctials are incorrect. Try Again!'
    })
 }
//login naprawic 32 / password potem

},
}