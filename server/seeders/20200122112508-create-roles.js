'use strict';

const faker = require('faker');

const roles = [];

for (let i = 0; i <= 20; i++) {
    const role = {
        name: 'user',
        user_id: i + 1,
        created_at: new Date(),
        updated_at: new Date()
    };

    roles.push(role);
}

const adminRole = {
    name: 'admin',
    user_id: 22,
    created_at: new Date(),
    updated_at: new Date()
};

roles.push(adminRole);

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', roles);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles');
    }
};
