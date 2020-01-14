'use strict';

module.exports = (sequelize, DataTypes) => {

  const Holidays = sequelize.define('holidays', {
    days_taken: {
      type: DataTypes.INTEGER,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    finish_date: {
      type: DataTypes.DATE,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
    }

  });

  Holidays.associate = function (models) {
    Holidays.belongsTo(models.employee, { foreignKey: 'employeeId' });
  };

  return Holidays;
};