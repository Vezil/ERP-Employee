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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Monar',
        surname: 'Dores',
        email: 'Monar@wp.pl',
        birthdate: '1994-11-10',
        password: HashPassword('awassdfsf4'),
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
      }
    ])
  }
};

function HashPassword(pass) {

  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
}