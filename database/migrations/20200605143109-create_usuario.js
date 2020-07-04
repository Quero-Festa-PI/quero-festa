'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.CHAR(255),
        allowNull: false
      },
      cpf: {
        type: Sequelize.CHAR(11),
        unique: true
      },
      data_nasc: {
        type: Sequelize.DATE,
      },
      sexo: {
        type: Sequelize.ENUM('M', 'F'),
        defaultValue: null
      },
      celular: {
          type: Sequelize.STRING(14),
          unique: true
      },
      imagem: {
        type: Sequelize.STRING,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};
