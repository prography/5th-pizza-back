'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_log = sequelize.define('UserLog', {
    user_no: DataTypes.STRING,
    log_in: DataTypes.DATE,
    log_out: DataTypes.DATE
  }, {
    timestamp: false
  });
  
  user_log.associate = function(models) {
    user_log.belongsTo( models.Users,{
        foreignKey: 'user_no'
    })
  };
  return user_log;
};