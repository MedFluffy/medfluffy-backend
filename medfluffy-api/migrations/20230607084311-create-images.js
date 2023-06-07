'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      img_url: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "unknown"
      },
      size_kb: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      extension_file: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "unknown"
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "unknown"
      },
      status: {
        type: Sequelize.ENUM('uploaded','predicted','unknown'),
        allowNull: false,
        defaultValue: "uploaded"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('images');
  }
};