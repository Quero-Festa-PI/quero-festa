'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lojas', [{
      id: 1,
      usuarios_id: 1,
      nome: 'Lojinha da Bianca',
      descricao: 'Os bolos de pote mais deliciosos diretamente de Minas Gerais.',
      avaliacao: 5,
      imagem: '/uploads/loja/bolo.png',
      telefone: '(11)91212-1212',
      email: 'bolos@querofesta.com'
    }, {
      id: 2,
      usuarios_id: 2,
      nome: 'Lojinha do Leléo',
      descricao: 'Os brigadeiros gourmet mais caros de toda São Paulo.',
      avaliacao: 2.3,
      imagem: '/uploads/loja/brigadeiro.png',
      telefone: '(11)92121-2121',
      email: 'brigadeiro@querofesta.com'
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lojas', null, {});
  }
};
