'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'holidays',
            [
                {
                    days_taken: 3,
                    confirmed: '0',
                    start_date: '2019-12-01',
                    finish_date: '2019-12-04',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 6
                },
                {
                    days_taken: 7,
                    confirmed: '1',
                    start_date: '2019-12-02',
                    finish_date: '2019-12-09',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 7
                }
            ],
            {}
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('holidays', [
            {
                userId: 6
            },
            {
                userId: 7
            }
        ]);
    }
};
