'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'contracts',
            [
                {
                    contract: 12,
                    start_date: '2019-11-11',
                    finish_date: '2020-11-11',
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 6
                }
            ],
            {}
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('contracts', [
            {
                userId: 6
            }
        ]);
    }
};
