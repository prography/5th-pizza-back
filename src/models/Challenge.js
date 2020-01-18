'use strict';
module.exports = (sequelize, DataTypes) => {
  const challenge = sequelize.define('Challenges', {
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    success: DataTypes.BOOLEAN
  });

  challenge.associate = function (models) {
    challenge.belongsTo(models.Users, { foreignKey: 'id' });
    challenge.belongsTo(models.BaseChallenges, { foreignKey: 'id' });
  };
  return challenge;
};