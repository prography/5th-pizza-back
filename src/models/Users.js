'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    user_id: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    timestamps: false
  });
  
  users.associate = function(models) {
    users.belongsToMany(models.Challenges, { through: 'UserChallenges', foreignKey: 'user_id' });
  };
  return users;
};