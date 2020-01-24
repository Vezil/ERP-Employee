'use strict';

module.exports = (sequelize, DataTypes) => {
    const Contracts = sequelize.define(
        'Contracts',
        {
            contract: DataTypes.INTEGER,
            start_date: DataTypes.DATE,
            finish_date: DataTypes.DATE
        },
        {
            tableName: 'contracts',
            underscored: true
        }
    );

    Contracts.associate = function(models) {
        Contracts.belongsTo(models.Users, {
            as: 'employee',
            foreignKey: 'userId'
        });
    };

    return Contracts;
};
