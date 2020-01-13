'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contracts = sequelize.define('contracts', {
    length: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    finish_date: DataTypes.DATE

  }, {});
  Contracts.associate = function (models) {

    Contracts.belongsTo(models.employee, { foreignKey: 'employeeId' });

  };
  return Contracts;
};