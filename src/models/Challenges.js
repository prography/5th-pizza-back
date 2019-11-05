'use strict';
module.exports = (sequelize, DataTypes) => {
  const challenges = sequelize.define('Challenges', {
    routine_type: DataTypes.INTEGER,
    object_unit: DataTypes.INTEGER,
    quota: DataTypes.DOUBLE
  }, {});
  
  challenges.associate = function(models) {

  };
  return challenges;
};