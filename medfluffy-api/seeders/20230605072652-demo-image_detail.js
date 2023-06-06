'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('image_detail', [{
      img_url: 'John',
      size_in_kb: 20,
      extension_file: 'png',
      description: '-',
      status: 'uploaded',
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('image_detail', null, {});
  }
};
