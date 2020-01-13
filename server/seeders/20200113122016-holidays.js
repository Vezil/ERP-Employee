'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('holidays', [
      {
        days_left: '16',
        confirmed: '0',
        start_date: '2019-12-01',
        finish_date: '2019-12-04',
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
