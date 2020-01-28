'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('contracts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contract_length: {
                type: Sequelize.STRING
            },
            start_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            finish_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('contracts');
    }
};
