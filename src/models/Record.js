'use strict';
module.exports = (sequelize, DataTypes) => {
  const record = sequelize.define('Records', {
    user_id: DataTypes.INTEGER,
    challenge_id: DataTypes.INTEGER,
    running_time: DataTypes.DOUBLE,
    distance: DataTypes.DOUBLE,
    created_at: DataTypes.DATE,
    screenshot: DataTypes.STRING
  }, 
  {
    timestamps: false
  });
  
  record.associate = function(models) {

  };
  return record;
};