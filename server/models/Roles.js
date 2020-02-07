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
        Roles.belongsToMany(models.Users, { through: models.UserRoles });
    };

    return Roles;
};
