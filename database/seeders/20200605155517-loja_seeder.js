'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lojas', [{
      id: 1,
      usuarios_id: 1,
      nome: 'Lojinha da Bianca',
      descricao: 'Os bolos de pote mais deliciosos diretamente de Minas Gerais.',
      avaliacao: 5
    }, {
      id: 2,
      usuarios_id: 2,
      nome: 'Lojinha do Leléo',
      descricao: 'Os brigadeiros gourmet mais caros de toda São Paulo.',
      avaliacao: 2.3
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lojas', null, {});
  }
};
