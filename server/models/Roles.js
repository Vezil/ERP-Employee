'use strict';

module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define('roles', {
        admin: {
            type: DataTypes.BOOLEAN
        },
        user: {
            type: DataTypes.BOOLEAN
        }
    });

    Roles.associate = function(models) {
        Roles.belongsTo(models.users, {
            as: 'employee',
            foreignKey: 'userId'
        });
    };

    return Roles;
};
