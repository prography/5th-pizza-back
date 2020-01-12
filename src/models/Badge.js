'use strict'

module.exports = (sequelize, DataTypes) => {
    const badge = sequelize.define('Badges', {
        type: DataTypes.ENUM([
            'Continous_recording',
            'Cycle_Accumulative_distance',
            'Cycle_Accumulative_time',
            'Running_Accumulative_distance',
            'Running_Accumulative_time',
            'Success_Challenge'
        ]),
        level: DataTypes.INTEGER
    }
   );
    
   badge.associate = function(models) {
       badge.belongsTo(models.Users, {foreignKey: 'id'})
    };
    return badge;
  };