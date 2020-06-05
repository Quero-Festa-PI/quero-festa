'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('imagensDeProduto', [{
      id: 1,
      image_url: 'bolo_morango.png',
      produtos_id: 1
    }, {
      id: 2,
      image_url: 'bolo_prestigio.png',
      produtos_id: 2
    }, {
      id: 3,
      image_url: 'brigadeiro_nutella_ninho.png',
      produtos_id: 3
    }, {
      id: 4,
      image_url: 'brigadeiro_nutella_ninho_embalado.png',
      produtos_id: 3
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('imagensDeProduto', null, {});
  }
};