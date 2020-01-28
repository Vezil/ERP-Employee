'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'roles',
            [
                {
                    name: 'user',
                    created_at: new Date(),
                    updated_at: new Date(),
                    user_id: 1
                },
                {
                    name: 'user',
                    created_at: new Date(),
                    updated_at: new Date(),
                    user_id: 2
                },
                {
                    name: 'user',
                    created_at: new Date(),
                    updated_at: new Date(),
                    user_id: 3
                },
                {
                    name: 'user',
                    created_at: new Date(),
                    updated_at: new Date(),
                    user_id: 4
                },
                {
                    name: 'user',
                    created_at: new Date(),
                    updated_at: new Date(),
                    user_id: 5
                },
                {
                    name: 'user',
                    created_at: new Date(),
                    updated_at: new Date(),
                    user_id: 6
                },
                {
                    name: 'user',
                    created_at: new Date(),
                    updated_at: new Date(),
                    user_id: 7
                },

                {
                    name: 'admin',
                    created_at: new Date(),
                    updated_at: new Date(),
                    user_id: 8
                }
            ],
            {}
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('roles', [
            {
                user_id: 1
            },
            {
                user_id: 2
            },
            {
                user_id: 3
            },
            {
                user_id: 4
            },
            {
                user_id: 5
            },
            {
                user_id: 6
            },
            {
                user_id: 7
            },
            {
                user_id: 8
            }
        ]);
    }
};
