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

    Roles.associate = function(models) {
        Roles.belongsTo(models.Users, {
            as: 'employee',
            foreignKey: 'user_id'
        });
    };

    return Roles;
};
