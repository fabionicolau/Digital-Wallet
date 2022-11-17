'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable("Accounts", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    balance: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2)
    },
  })
},

  down: async (queryInterface, _Sequelize) => {
   queryInterface.dropTable("Accounts");
  }
};
