'use strict';
module.exports = (sequelize, DataTypes) => {
  const userChallenges = sequelize.define('UserChallenges', {
    user_id: DataTypes.INTEGER,
    challenge_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    timestamps: false
  });
  
  userChallenges.associate = function(models) {

  };
  return userChallenges;
};