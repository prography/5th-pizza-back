'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_no: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      log_in: {
        allowNull: false,
        type: Sequelize.DATE
      },
      log_out: {
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserLogs');
  }
};
