'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pedidos', [{
      id: 1,
      usuarios_id: 3,
      lojas_id: 1,
      enderecos_id: 4,
      pagamentos_id: 1,
      entregas_id: 1,
      valor_total: 10
    }, {
      id: 2,
      usuarios_id: 4,
      lojas_id: 2,
      enderecos_id: 5,
      pagamentos_id: 2,
      entregas_id: 2,
      valor_total: 15
    }, {
      id: 3,
      usuarios_id: 3,
      lojas_id: 2,
      enderecos_id: 4,
      pagamentos_id: 3,
      entregas_id: 3,
      valor_total: 30
    }, {
      id: 4,
      usuarios_id: 4,
      lojas_id: 1,
      enderecos_id: 5,
      pagamentos_id: 4,
      entregas_id: 4,
      valor_total: 50
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pedidos', null, {});
  }
};