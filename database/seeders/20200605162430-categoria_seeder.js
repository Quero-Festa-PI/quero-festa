'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categorias', [{
      id: 1,
      nome: 'Aniversário'
    }, {
      id: 2,
      nome: 'Festa Junina'
    }, {
      id: 3,
      nome: 'Bodas'
    }, {
      id: 4,
      nome: 'Natal'
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categorias', null, {});
  }
};