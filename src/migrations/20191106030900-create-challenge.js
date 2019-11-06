'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Challenges', {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Challenges');
  }
};
