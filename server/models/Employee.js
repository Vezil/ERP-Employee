module.exports = (sequelize, DataTypes) =>
    sequelize.define('employee', {
        name:{
            type:DataTypes.STRING
        },
        surname:{
            type:DataTypes.STRING
        },
        birthdate:{
            type:DataTypes.DATE
        }
    })