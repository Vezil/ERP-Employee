'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('holidays', [
      {
        days_left: '20',
        confirmed: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
        employeeId: 6,
      },

    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('holidays', [
      {
        employeeId: 6
      },

    ])
  }
};
