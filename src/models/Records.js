'use strict';
module.exports = (sequelize, DataTypes) => {
  const records = sequelize.define('Records', {
    running_time: DataTypes.TIME,
    distance: DataTypes.DOUBLE
  }, {
    timestamp: true
  });
  
  records.associate = function(models) {

  };
  return records;
};