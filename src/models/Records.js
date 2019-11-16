'use strict';
module.exports = (sequelize, DataTypes) => {
  const records = sequelize.define('Records', {
    running_time: DataTypes.TIME,
    distance: DataTypes.DOUBLE,
    created_at: DataTypes.DATE
  });
  
  records.associate = function(models) {

  };
  return records;
};