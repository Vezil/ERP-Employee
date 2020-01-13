'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('contracts', [
      {
        length: 1,
        start_date: '2019-11-11',
        finish_date: '2019-12-11',
        createdAt: new Date(),
        updatedAt: new Date(),
        employeeId: 6,
      },

    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('contracts', [
      {
        employeeId: 6
      },

    ])
  }
};
