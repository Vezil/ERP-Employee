'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holidays = sequelize.define('holidays', {
    days_left: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
  }, {});
  Holidays.associate = function (models) {
    Holidays.belongsTo(models.employee, { foreignKey: 'employeeId' });
  };
  return Holidays;
};