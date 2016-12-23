'use strict';

module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define('Expense', {
    date: DataTypes.DATE,
    category: DataTypes.STRING,
    employee_name: DataTypes.STRING,
    employee_address: DataTypes.STRING,
    expense_description: DataTypes.STRING,
    pretax_amount: DataTypes.DOUBLE,
    tax_name: DataTypes.STRING,
    tax_amount: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Expense;
};
