'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('result_detail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_img: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        references: {
          model: 'image_detail',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      },
      result_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "unknown"
      },
      accuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('result_details');
  }
};