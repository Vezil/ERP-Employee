'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holidays = sequelize.define('holidays', {
    days_left: DataTypes.STRING,
    start_date: DataTypes.DATE,
    finish_date: DataTypes.DATE,
    confirmed: DataTypes.BOOLEAN
  }, {});
  Holidays.associate = function (models) {

    Holidays.belongsTo(models.employee, { foreignKey: 'employeeId' });

  };
  return Holidays;
};