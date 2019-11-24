'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_log = sequelize.define('UserLog', {
    // user_no: DataTypes.STRING,
    // log_in: DataTypes.DATETIME,
    // log_out: DataTypes.DATETIME
  });
  
  user_log.associate = function(models) {
    // user_log.belongsTo( models.Users,{
    //     foreignKey: 'user_no'
    // })
  };
  return user_log;
};