'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      // Timestamps are disabled, so no `createdAt` or `updatedAt` columns
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('todos');
  }
};
