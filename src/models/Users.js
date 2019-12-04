'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    timestamps: false
  });
  
  users.associate = function(models) {
    users.belongsToMany(models.Challenges, {through: 'UserChallenges'});
  };
  return users;
};