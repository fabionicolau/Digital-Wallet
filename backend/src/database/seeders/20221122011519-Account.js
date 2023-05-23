'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        balance: 100,
      },
      {
        balance: 100,
      },
    ], {});
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};
