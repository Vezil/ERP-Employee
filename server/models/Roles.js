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

    Roles.associate = models => {
        Roles.belongsTo(models.Users, {
            as: 'employee',
            foreignKey: 'user_id'
        });
        Roles.belongsToMany(models.UserRoles, {
            as: 'roles',
            foreignKey: 'role_id'
        });
    };

    Roles.ROLE_USER = 'user';
    Roles.ROLE_ADMIN = 'admin';

    return Roles;
};
