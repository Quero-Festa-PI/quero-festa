'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categorias',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categorias');
  }
};
