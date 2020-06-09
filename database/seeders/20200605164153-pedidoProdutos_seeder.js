'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pedido_produtos', [{
      id: 1,
      pedidos_id: 1,
      produtos_id: 1,
      quantidade: 2
    }, {
      id: 2,
      pedidos_id: 2,
      produtos_id: 3,
      quantidade: 2
    }, {
      id: 3,
      pedidos_id: 3,
      produtos_id: 3,
      quantidade: 4
    }, {
      id: 4,
      pedidos_id: 4,
      produtos_id: 1,
      quantidade: 5
    }, {
      id: 5,
      pedidos_id: 4,
      produtos_id: 2,
      quantidade: 5
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pedido_produtos', null, {});
  }
};