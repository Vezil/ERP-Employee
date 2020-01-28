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
        'Users',
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
                type: DataTypes.DATEONLY
            },
            password: {
                type: DataTypes.STRING
            },
            days_left: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'users',
            underscored: true,
            defaultScope: {
                attributes: { exclude: ['password'] }
            },
            hooks: {
                beforeSave: hashPassword
            }
        }
    );

    Users.associate = function(models) {
        Users.hasMany(models.Holidays);
        Users.hasMany(models.Contracts);
        Users.hasOne(models.Roles);
    };

    Users.prototype.comparePassword = function(password) {
        return bcrypt.compareAsync(password, this.password);
    };

    Users.prototype.isUser = async function() {
        const role = await this.getRole();

        if (role.name === 'user') {
            return true;
        }

        return false;
    };

    Users.prototype.isAdmin = async function() {
        const role = await this.getRole();

        if (role.name === 'admin') {
            return true;
        }

        return false;
    };

    return Users;
};
