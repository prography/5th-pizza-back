'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    user_id: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    timestamps: false
  });
  
  users.associate = function(models) {
    users.hasMany( models.UserLog,{
        foreignKey: 'user_no'
      });
  };
  return users;
};