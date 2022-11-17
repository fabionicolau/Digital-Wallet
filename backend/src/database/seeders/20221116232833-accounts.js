module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Accounts',
      [
        {
          id: 1,
          balance: 1000,
        },
        {
          id: 2,
          balance: 2000,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};
