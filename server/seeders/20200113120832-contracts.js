'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'contracts',
            [
                {
                    contract_length: 12,
                    start_date: '2019-11-11',
                    finish_date: '2020-11-11',
                    created_at: new Date(),
                    updated_at: new Date(),
                    user_id: 6
                }
            ],
            {}
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('contracts', [
            {
                user_id: 6
            }
        ]);
    }
};
