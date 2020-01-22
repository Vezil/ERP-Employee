'use strict';

module.exports = (sequelize, DataTypes) => {
    const Holidays = sequelize.define(
        'Holidays',
        {
            days_taken: {
                type: DataTypes.INTEGER
            },
            start_date: {
                type: DataTypes.DATE
            },
            finish_date: {
                type: DataTypes.DATE
            },
            confirmed: {
                type: DataTypes.BOOLEAN
            }
        },
        {
            tableName: 'holidays',
            underscored: true
        }
    );

    Holidays.associate = function(models) {
        Holidays.belongsTo(models.Users, {
            as: 'employee',
            foreignKey: 'user_Id'
        });
    };

    return Holidays;
};
