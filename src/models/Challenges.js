'use strict';
module.exports = (sequelize, DataTypes) => {
  const challenges = sequelize.define('Challenges', {
    routine_type: DataTypes.ENUM('daily','weekly','monthly'),
    object_unit: DataTypes.ENUM('distance','time'),
    quota: DataTypes.DOUBLE,
    exercise_type: DataTypes.ENUM('running', 'cycling')
  }, {
      timestamp: true
  });
  
  challenges.associate = function(models) {

  };
  return challenges;
};