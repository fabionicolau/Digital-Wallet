'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'Fabio',
        password: '$2a$10$vK.xEZu7m4lUo.DfCsrPeeHZXxw2qoJoRi0y1Ayl8vtXOgJPt8GtO', // 123Senha
        accountId: 1,
      },
      {
        id: 2,
        username: 'Joao',
        password: '$2a$10$vK.xEZu7m4lUo.DfCsrPeeHZXxw2qoJoRi0y1Ayl8vtXOgJPt8GtO', // 123Senha
        accountId: 2,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
