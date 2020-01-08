const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

module.exports = (sequelize, DataTypes) =>{
   const employee = sequelize.define('employee', {
        name:{
            type:DataTypes.STRING
        },
        surname:{
            type:DataTypes.STRING
        },
        birthdate:{
            type:DataTypes.DATE
        },
        password: DataTypes.STRING
    })

    return employee
}