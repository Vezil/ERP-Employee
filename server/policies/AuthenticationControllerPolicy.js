const Joi = require('joi')

module.exports = {
     create(req,res,next){
        const schema = {
            name: Joi.string(),
            surname: Joi.string(),
            birthdate: Joi.date(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
              )
        }

        const{error,value} = Joi.validate(req.body,schema)

        if(error) {
            switch (error.details[0].context.key){
                case 'name':
                res.status(400).send({
                    error:'Error with name'
                })
                break
                case 'surname':
                res.status(400).send({
                   error:'Error with surname'
                })   
                break
                case 'birthdate':
                res.status(400).send({
                  error:'Error with birthdate'
                })
                break
                case 'password':
                res.status(400).send({
                  error:'Error with password'
                })
                break
                default:
                res.status(400).send({
                    error:'Invalid data'
                })
            }
        } else{

        next()
        }
     }
}