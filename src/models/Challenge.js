'use strict';
module.exports = (sequelize, DataTypes) => {
  const challenge = sequelize.define('Challenges', {
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    success: DataTypes.BOOLEAN
  });

  challenge.associate = function (models) {
    challenge.belongsTo(models.Users);
    challenge.belongsTo(models.BaseChallenges);
  };
  return challenge;
};