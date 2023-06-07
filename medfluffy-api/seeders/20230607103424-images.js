'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
    return queryInterface.bulkInsert('images', [{
      img_url: 'unknown',
      size_kb: 0,
      extension_file: 'unknown',
      description: 'unknown',
      status: 'unknown',
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('images', null, {});
  }
};
