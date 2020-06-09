'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pagamentos', [{
      id: 1,
      forma_pagamento: 'Débito',
      status: 'Efutuado'
    }, {
      id: 2,
      forma_pagamento: 'Crédito',
      status: 'Efetuado'
    }, {
      id: 3,
      forma_pagamento: 'Boleto',
      status: 'Efetuado'
    }, {
      id: 4,
      forma_pagamento: 'Boleto',
      status: 'Efetuado'
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pagamentos', null, {});
  }
};