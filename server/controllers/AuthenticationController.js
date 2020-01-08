const {employee} = require('../models')
const jwt = require('jsonwebtoken')
const config = require("../config/config")

function jwtSignEmployee(employee) {
  const ONE_DAY = 60 * 60 * 24
  return jwt.sign(employee, config.authentication.jwtSecret,{
    expiresIn: ONE_DAY
  })
}

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
      
    const {name,surname,password} = req.body
    const user = await employee.findOne({
      where:{
        name:name,
        surname:surname
      }
    })
    
    if(!user) {
     return res.status(403).send({
        error:'The login information was incorrect'
      })
    }
  
    const PasswordValid = password === user.password

    if(!PasswordValid){
      return res.status(403).send({
        error:'The login information was incorrect pass'
      })
    }  
       const userJson = user.toJSON()
        
        res.send({
          employee: userJson,
          token: jwtSignEmployee(userJson)
        })
    } catch (err) {
    res.status(500).send({
    error: 'This credenctials are incorrect. Try Again!'
    })
  }


 },

}