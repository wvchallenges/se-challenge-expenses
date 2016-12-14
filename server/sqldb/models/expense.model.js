'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Expense', {
    id: {
      type:  DataTypes.INTEGER ,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: DataTypes.STRING,
    expense_date: DataTypes.DATE,
    employee_name: DataTypes.STRING,
    employee_address: DataTypes.STRING,
    expense_description: DataTypes.STRING,
    // according to this blog, decimal(13, 4) is best for money
    // https://rietta.com/blog/2012/03/03/best-data-types-for-currencymoney-in/
    // TODO: having 4 digits after decimal makes sense, but why 13 before the decimal? figure out
    pre_tax_amount: DataTypes.DECIMAL(13, 4),
    tax_name: DataTypes.STRING,
    tax_amount: DataTypes.DECIMAL(13, 4)
  },{
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName:true,
    tableName:'expenses'
  });
};
