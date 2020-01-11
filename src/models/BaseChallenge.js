'use strict';
module.exports = (sequelize, DataTypes) => {
  const baseChallenge = sequelize.define('BaseChallenges', {
    routine_type: DataTypes.ENUM('daily','weekly','monthly'),
    object_unit: DataTypes.ENUM('distance','time'),
    quota: DataTypes.DOUBLE,
    exercise_type: DataTypes.ENUM('running', 'cycling'),
    created_at: DataTypes.DATE
  },
  {
    timestamps: false
  });
  
  baseChallenge.associate = function(models) {
    baseChallenge.belongsToMany(models.Users, { through: 'UserChallenges' });
  };
  return baseChallenge;
};