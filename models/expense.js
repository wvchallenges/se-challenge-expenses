'use strict';

module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define('Expense', {
    date: DataTypes.DATE,
    category: DataTypes.STRING,
    employee_name: DataTypes.STRING,
    employee_address: DataTypes.STRING,
    expense_description: DataTypes.STRING,
    pretax_amount: DataTypes.DECIMAL,
    tax_name: DataTypes.STRING,
    tax_amount: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Expense;
};
