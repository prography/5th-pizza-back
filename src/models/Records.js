'use strict';
module.exports = (sequelize, DataTypes) => {
  const records = sequelize.define('Records', {
    running_time: DataTypes.TIME,
    distance: DataTypes.INTEGER
  }, {});
  
  records.associate = function(models) {

  };
  return records;
};