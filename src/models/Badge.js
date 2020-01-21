'use strict'

module.exports = (sequelize, DataTypes) => {
    const badge = sequelize.define('Badges', {
        type: {
            type: DataTypes.ENUM([
                'Continous_recording',
                'Cycle_Accumulative_distance',
                'Cycle_Accumulative_time',
                'Running_Accumulative_distance',
                'Running_Accumulative_time',
                'Success_Challenge'
            ]),
            unique: true,
        },
        level: {
            type: DataTypes.INTEGER,
            unique: true,
        }
    }, {
        undersocred: true,
    });
    
    badge.associate = function(models) {
       badge.belongsTo(models.Users, {foreignKey: 'id', as: 'user_id', unique: true })
    };
    return badge;
  };