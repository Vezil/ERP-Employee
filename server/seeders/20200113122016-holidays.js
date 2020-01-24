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
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 6
                },
                {
                    days_taken: 7,
                    confirmed: '1',
                    start_date: '2019-12-02',
                    finish_date: '2019-12-09',
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 7
                }
            ],
            {}
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('holidays', [
            {
                user_Id: 6
            },
            {
                user_Id: 7
            }
        ]);
    }
};
