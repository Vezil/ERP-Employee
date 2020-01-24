'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'roles',
            [
                {
                    name: 'user',
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 1
                },
                {
                    name: 'user',
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 2
                },
                {
                    name: 'user',
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 3
                },
                {
                    name: 'user',
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 4
                },
                {
                    name: 'user',
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 5
                },
                {
                    name: 'user',
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 6
                },
                {
                    name: 'user',
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 7
                },

                {
                    name: 'admin',
                    created_At: new Date(),
                    updated_At: new Date(),
                    user_Id: 8
                }
            ],
            {}
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('roles', [
            {
                user_Id: 1
            },
            {
                user_Id: 2
            },
            {
                user_Id: 3
            },
            {
                user_Id: 4
            },
            {
                user_Id: 5
            },
            {
                user_Id: 6
            },
            {
                user_Id: 7
            },
            {
                user_Id: 8
            }
        ]);
    }
};
