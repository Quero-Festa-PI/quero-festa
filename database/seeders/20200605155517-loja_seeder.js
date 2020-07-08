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
      email: 'brigadeiros@querofesta.com'
    }, {
      id: 3,
      usuarios_id: 4,
      nome: 'Artigos para Festa Junina',
      descricao: 'Tudo para você fazer uma festa junina top.',
      imagem: '/uploads/loja/junina.png',
      telefone: '(11)99254-2548',
      email: 'junina@querofesta.com.br',
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lojas', null, {});
  }
};
