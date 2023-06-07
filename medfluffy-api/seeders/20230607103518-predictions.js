'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('predictions', [{
      id: 0,
      id_user: 1,
      id_img: 1,
      id_result: 1
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('predictions', null, {});
  }
};
