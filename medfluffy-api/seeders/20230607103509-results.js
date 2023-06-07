'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('results', [{
      id_img: 1,
      result_name: 'unknown',
      accuration: 0,
      description: 'unknown'
  }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('results', null, {});
  }
};
