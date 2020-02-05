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

    UserRole.associate = function(models) {
        UserRole.belongsTo(models.Users, {
            as: 'employee',
            foreignKey: 'user_id'
        });
    };

    return UserRoles;
};
