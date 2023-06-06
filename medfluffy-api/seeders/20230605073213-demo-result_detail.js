'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('result_detail', [{
      id_img: 1,
      result_name: 'a',
      accuration: 0,
      description: '-'
  }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('result_detail', null, {});
  }
};
