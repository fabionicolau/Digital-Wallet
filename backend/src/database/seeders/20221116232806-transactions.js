module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Transactions',
      [
        {
          id: 1,
          debitedAccountId: 1,
          creditedAccountId: 2,
          value: 100,
          createdAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};
