'use strict';

const faker = require('faker');

const contracts = [];
const randomContractLength = [1, 3, 6, 12];

for (let i = 0; i <= 20; i++) {
    const contract = {
        contract_length: faker.helpers.randomize(randomContractLength),
        start_date: faker.date.past(),
        finish_date: faker.date.future(),
        user_id: i + 1,
        created_at: new Date(),
        updated_at: new Date()
    };

    contracts.push(contract);
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('contracts', contracts);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('contracts');
    }
};
