'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('Users', {
    user_id: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.ENUM('kakao', 'google', 'facebook', 'naver'),
    created_at: DataTypes.DATE,
    continous_record: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    timestamps: false
  });
  
  user.associate = function(models) {
    user.hasMany(models.Challenges);
    user.hasMany(models.Badges);
  };
  return user;
};