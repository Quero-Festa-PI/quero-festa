'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('produtos_categorias', [{
      id: 1,
      categorias_id: 1,
      produtos_id: 1
    }, {
      id: 2,
      categorias_id: 1,
      produtos_id: 2
    }, {
      id: 3,
      categorias_id: 1,
      produtos_id: 3
    }, {
      id: 4,
      categorias_id: 3,
      produtos_id: 3
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('produtos_categorias', null, {});
  }
};