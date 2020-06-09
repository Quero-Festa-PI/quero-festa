'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('enderecos', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      estado: {
        type: Sequelize.CHAR(2),
        allowNull: false
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cep: {
        type: Sequelize.CHAR(8),
        allowNull: false
      },
      logradouro: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numeral: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      complemento: {
        type: Sequelize.STRING,
      },
      usuarios_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: { tableName: 'usuarios' },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('enderecos');
  }
};
