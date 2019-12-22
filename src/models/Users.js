'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    user_id: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.ENUM('kakao', 'google', 'facebook', 'naver'),
    created_at: DataTypes.DATE
  }, {
    timestamps: false
  });
  
  users.associate = function(models) {
    users.belongsToMany(models.Challenges, { through: 'UserChallenges' });
  };
  return users;
};