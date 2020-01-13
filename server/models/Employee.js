const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(employee, options) {
    const SALT_F = 8

    if (!employee.changed('password')) {
        return;
    }

    return bcrypt.genSaltAsync(SALT_F)
        .then(salt => bcrypt.hashAsync(employee.password, salt, null))
        .then(hash => {
            employee.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const employee = sequelize.define('employee', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING
        },
        birthdate: {
            type: DataTypes.DATE
        },
        password: {
            type: DataTypes.STRING
        },
    }, {
        hooks: {
            beforeSave: hashPassword
        }
    })

    employee.associate = function (models) {


        employee.hasMany(models.holidays);
        employee.hasMany(models.contracts);

    };

    employee.prototype.comparePassword = function (password) {

        return bcrypt.compareAsync(password, this.password)
    }


    return employee
}