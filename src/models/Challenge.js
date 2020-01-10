'use strict';
module.exports = (sequelize, DataTypes) => {
  const challenge = sequelize.define('Challenges', {
    routine_type: DataTypes.ENUM('daily','weekly','monthly'),
    object_unit: DataTypes.ENUM('distance','time'),
    quota: DataTypes.DOUBLE,
    exercise_type: DataTypes.ENUM('running', 'cycling'),
    created_at: DataTypes.DATE
  },
  {
    timestamps: false
  });
  
  challenge.associate = function(models) {
    challenge.belongsToMany(models.Users, { through: 'UserChallenges' });
  };
  return challenge;
};