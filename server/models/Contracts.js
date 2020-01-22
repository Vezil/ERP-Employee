'use strict';

module.exports = (sequelize, DataTypes) => {
    const Contracts = sequelize.define(
        'contracts',
        {
            contract: DataTypes.INTEGER,
            start_date: DataTypes.DATE,
            finish_date: DataTypes.DATE
        },
        {}
    );

    Contracts.associate = function(models) {
        Contracts.belongsTo(models.users, {
            as: 'employee',
            foreignKey: 'userId'
        });
    };

    return Contracts;
};
