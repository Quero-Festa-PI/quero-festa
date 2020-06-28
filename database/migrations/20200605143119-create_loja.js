'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lojas', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.STRING
      },
      avaliacao: {
        type: Sequelize.FLOAT
      },
      imagem: {
        type:Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING(14),
        unique: true
      }, 
      email: {
        type: Sequelize.STRING,
        unique: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lojas');
  }
};
