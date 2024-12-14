'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Creating 'todos' table
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

    // Creating 'tasks' table
    await queryInterface.createTable('tasks', {
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
    // Dropping 'todos' table
    await queryInterface.dropTable('todos');
    
    // Dropping 'tasks' table
    await queryInterface.dropTable('tasks');
  }
};
