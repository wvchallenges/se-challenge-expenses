'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      request_id: {
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      category: {
        type: Sequelize.STRING
      },
      employee_name: {
        type: Sequelize.STRING
      },
      employee_address: {
        type: Sequelize.STRING
      },
      expense_description: {
        type: Sequelize.STRING
      },
      pretax_amount: {
        type: Sequelize.DECIMAL
      },
      tax_name: {
        type: Sequelize.STRING
      },
      tax_amount: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Expenses');
  }
};
