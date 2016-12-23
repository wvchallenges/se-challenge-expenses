'use strict';
module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define('Request', {
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Request.hasMany(models.Expense, {
          foreignKey: 'request_id'
        });
      }
    }
  });

  return Request;
};
