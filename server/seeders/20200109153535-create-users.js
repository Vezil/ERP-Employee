'use strict';

const faker = require('faker');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

const users = [];

for (let i = 0; i <= 20; i++) {
    const user = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
        birthdate: faker.date.past(),

        password: bcrypt.hashSync('password'),
        days_left: 26,
        created_at: new Date(),
        updated_at: new Date()
    };

    users.push(user);
}

const admin = {
    name: 'admin',
    surname: 'admin',
    email: 'admin@wp.pl',
    birthdate: '1999-11-11',

    password: bcrypt.hashSync('password'),
    days_left: 0,
    created_at: new Date(),
    updated_at: new Date()
};

users.push(admin);

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', users);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users');
    }
};
