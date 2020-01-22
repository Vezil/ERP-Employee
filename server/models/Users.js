const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

function hashPassword(user, options) {
    const SALT_F = 8;

    if (!user.changed('password')) {
        return;
    }

    return bcrypt
        .genSaltAsync(SALT_F)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash);
        });
}

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'users',
        {
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
            days_left: {
                type: DataTypes.INTEGER
            }
        },
        {
            hooks: {
                beforeSave: hashPassword
            }
        }
    );

    Users.associate = function(models) {
        Users.hasMany(models.holidays);
        Users.hasMany(models.contracts);
        Users.hasOne(models.roles);
    };

    Users.prototype.comparePassword = function(password) {
        return bcrypt.compareAsync(password, this.password);
    };

    return Users;
};
