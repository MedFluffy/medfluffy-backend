'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('image_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      img_url: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "unknown"
      },
      size_in_kb: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      extensiom_file: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "unknown"
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "unknown"
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
    await queryInterface.dropTable('image_details');
  }
};