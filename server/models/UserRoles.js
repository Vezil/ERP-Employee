'use strict';

module.exports = (sequelize, DataTypes) => {
    const UserRoles = sequelize.define(
        'UserRoles',
        {},
        {
            tableName: 'user_roles',
            underscored: true
        }
    );

    UserRoles.associate = function(models) {
        UserRoles.belongsTo(models.Users, {
            as: 'employee',
            foreignKey: 'role_id'
        });
    };

    return UserRoles;
};
