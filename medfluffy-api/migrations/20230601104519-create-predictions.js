'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('predictions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "unknown"
      },
      id_img: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        references: {
          model: 'image_detail',
          key: 'id'
        }
      },
      id_result: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        references: {
          model: 'result_detail',
          key: 'id'
        }
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
    await queryInterface.dropTable('predictions');
  }
};
