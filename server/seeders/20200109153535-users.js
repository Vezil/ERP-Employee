'use strict';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'John',
                    surname: 'Doe',
                    email: 'JohnDoe@wp.pl',
                    birthdate: '1999-11-10',
                    password: HashPassword('password'),
                    days_left: 26,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: 'Monar',
                    surname: 'Dores',
                    email: 'Monar@wp.pl',
                    birthdate: '1994-11-10',
                    password: HashPassword('password'),
                    days_left: 26,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: 'Masfasf',
                    surname: 'Poasfes',
                    email: 'Monaafwawr@wp.pl',
                    birthdate: '1993-11-10',
                    password: HashPassword('password'),
                    days_left: 26,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: 'KOaspndr',
                    surname: 'Doasdaes',
                    email: 'M2323r@wp.pl',
                    birthdate: '1993-11-10',
                    password: HashPassword('password'),
                    days_left: 26,

                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: 'Masfasf',
                    surname: 'Poasfes',
                    email: '2234rwwawr@wp.pl',
                    birthdate: '1992-11-10',
                    password: HashPassword('password'),
                    days_left: 26,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: 'Szymon',
                    surname: 'aasfasf',
                    email: 'SzymonYerba@wp.pl',
                    birthdate: '1992-11-10',
                    password: HashPassword('password'),
                    days_left: 23,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: 'KOaspndr',
                    surname: 'Doasdaes',
                    email: 'asfasafs3r@wp.pl',
                    birthdate: '1995-11-15',
                    password: HashPassword('password'),
                    days_left: 19,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: 'Admin',
                    surname: 'Admin',
                    email: 'admin@wp.pl',
                    birthdate: '1999-11-11',
                    password: HashPassword('password'),
                    days_left: 0,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: 'User',
                    surname: 'User',
                    email: 'user@wp.pl',
                    birthdate: '1999-11-11',
                    password: HashPassword('password'),
                    days_left: 0,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', [
            {
                email: 'JohnDoe@wp.pl'
            },
            {
                email: 'Monar@wp.pl'
            },
            {
                email: 'Monaafwawr@wp.pl'
            },
            {
                email: 'M2323r@wp.pl'
            },
            {
                email: '2234rwwawr@wp.pl'
            },
            {
                email: 'SzymonYerba@wp.pl'
            },
            {
                email: 'asfasafs3r@wp.pl'
            },
            {
                email: 'admin@wp.pl'
            },
            {
                email: 'user@wp.pl'
            }
        ]);
    }
};

function HashPassword(pass) {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
}
