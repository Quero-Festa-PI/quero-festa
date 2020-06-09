'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produtos', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      lojas_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: { tableName: 'lojas' },
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valor: {
        type: Sequelize.FLOAT.UNSIGNED,
        allowNull: false
      },
      disponibilidade: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING
      },
      avaliacao: {
        type: Sequelize.FLOAT
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('produtos');
  }
};
