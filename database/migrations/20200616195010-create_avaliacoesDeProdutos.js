'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('avaliacoesDeProdutos', {
      id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
      },
      produtos_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
      },
      usuarios_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
      },
      classificacao: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
      },
      comentario: {
          type: Sequelize.STRING(75),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('avaliacoesDeProdutos');
  }
};
