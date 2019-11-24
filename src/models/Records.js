'use strict';
module.exports = (sequelize, DataTypes) => {
  const records = sequelize.define('Records', {
    running_time: DataTypes.DOUBLE,
    distance: DataTypes.DOUBLE,
    created_at: DataTypes.DATE
  }, 
  {
    timestamps: false
  });
  
  records.associate = function(models) {

  };
  return records;
};