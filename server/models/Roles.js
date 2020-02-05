'use strict';

module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define(
        'Roles',
        {
            name: DataTypes.STRING
        },
        {
            tableName: 'roles',
            underscored: true
        }
    );

    Roles.ROLE_USER = 2;
    Roles.ROLE_ADMIN = 1;

    return Roles;
};
