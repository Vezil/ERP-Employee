'use strict';
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees', [
      {
        name: 'John',
        surname: 'Doe',
        email: 'JohnDoe@wp.pl',
        birthdate: '1999-11-10',
        password: HashPassword('aasddasf4'),
        days_left: 26,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Monar',
        surname: 'Dores',
        email: 'Monar@wp.pl',
        birthdate: '1994-11-10',
        password: HashPassword('awassdfsf4'),
        days_left: 26,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Masfasf',
        surname: 'Poasfes',
        email: 'Monaafwawr@wp.pl',
        birthdate: '1993-11-10',
        password: HashPassword('awawfafawdfsf4'),
        days_left: 26,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'KOaspndr',
        surname: 'Doasdaes',
        email: 'M2323r@wp.pl',
        birthdate: '1993-11-10',
        password: HashPassword('Pitsadsdfsf4'),
        days_left: 26,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Masfasf',
        surname: 'Poasfes',
        email: '2234rwwawr@wp.pl',
        birthdate: '1992-11-10',
        password: HashPassword('awgawgawdfsf4'),
        days_left: 26,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Szymon',
        surname: 'aasfasf',
        email: 'SzymonYerba@wp.pl',
        birthdate: '1992-11-10',
        password: HashPassword('12345qwert'),
        days_left: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'KOaspndr',
        surname: 'Doasdaes',
        email: 'asfasafs3r@wp.pl',
        birthdate: '1995-11-15',
        password: HashPassword('Piasfawsfdsdfsf4'),
        days_left: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employees', [
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
        email: '2234rwwawr@wp.pl'
      },
      {
        email: 'SzymonYerba@wp.pl'
      },
      {
        email: 'asfasafs3r@wp.pl'
      }
    ])
  }
};

function HashPassword(pass) {

  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
}