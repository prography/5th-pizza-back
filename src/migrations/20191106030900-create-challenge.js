'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BaseChallenges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      routine_type: {
        allowNull: false,
        type: Sequelize.ENUM('daily','weekly','monthly')
      },
      object_unit:{
        allowNull: false,
        type: Sequelize.ENUM('distance','time')
      },
      quota:{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      exercise_type: {
        allowNull: false,
        type: Sequelize.ENUM('running', 'cycling')
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Challenges');
  }
};
