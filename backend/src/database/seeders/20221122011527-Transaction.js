'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Transactions', [
      {
        debitedAccountId: 2,
        creditedAccountId: 1,
        value: 10,
        createdAt: "2022-11-20"
      },
      {
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 10,
        createdAt: "2022-11-21"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
