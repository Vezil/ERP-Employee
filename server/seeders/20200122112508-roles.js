'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'roles',
            [
                {
                    admin: false,
                    user: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 1
                },
                {
                    admin: false,
                    user: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 2
                },
                {
                    admin: false,
                    user: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 3
                },
                {
                    admin: false,
                    user: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 4
                },
                {
                    admin: false,
                    user: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 5
                },
                {
                    admin: false,
                    user: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 6
                },
                {
                    admin: false,
                    user: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 7
                },

                {
                    admin: true,
                    user: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 8
                }
            ],
            {}
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('roles', [
            {
                userId: 1
            },
            {
                userId: 2
            },
            {
                userId: 3
            },
            {
                userId: 4
            },
            {
                userId: 5
            },
            {
                userId: 6
            },
            {
                userId: 7
            },
            {
                userId: 8
            }
        ]);
    }
};
