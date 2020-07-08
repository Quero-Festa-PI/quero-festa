'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('produtos', [{
      id: 1,
      lojas_id: 1,
      nome: 'Bolo de Pote - Morango',
      valor: 5,
      descricao: 'Bolo de pote de 250g sabor morango. Uma delícia!',
    }, {
      id: 2,
      lojas_id: 1,
      nome: 'Bolo de Pote - Prestígio',
      valor: 7.5,
      descricao: 'Bolo de pote de 250g sabor prestígio. O queridinho!',
    }, {
      id: 3,
      lojas_id: 1,
      nome: 'Bolo de Pote - Oreo',
      valor: 7.5,
      descricao: 'Bolo de pote de 250g sabor oreo. Extremamente crocante!',
    }, {
      id: 4,
      lojas_id: 1,
      nome: 'Bolo de Pote - Limão',
      valor: 5,
      descricao: 'Bolo de pote de 250g sabor limão. Para quem gosta de azedinho!',
    }, {
      id: 5,
      lojas_id: 1,
      nome: 'Bolo de Morango',
      valor: 5,
      descricao: 'Bolo de 1kg sabor morango. Delícia tamanho família!',
    }, {
      id: 6,
      lojas_id: 1,
      nome: 'Bolo de Prestígio',
      valor: 5,
      descricao: 'Bolo de 1kg sabor prestígio. O queridinho para toda a família!',
    }, {
      id: 7,
      lojas_id: 1,
      nome: 'Bolo de Nutella',
      valor: 5,
      descricao: 'Bolo de 1kg sabor nutella. Explosão de chocolate tamanho família!',
    }, {
      id: 8,
      lojas_id: 1,
      nome: 'Bolo de Limão',
      valor: 5,
      descricao: 'Bolo de 1kg sabor limão. Para a família que prefere o azedinho!',
    }, {
      id: 9,
      lojas_id: 2,
      nome: 'Brigadeiro de Chocolate',
      valor: 2,
      descricao: 'Delicioso brigadeiro de chocolate.',
    }, {
      id: 10,
      lojas_id: 2,
      nome: 'Brigadeiro de Morango',
      valor: 2,
      descricao: 'Delicioso brigadeiro de morango.',
    }, {
      id: 11,
      lojas_id: 2,
      nome: 'Beijinho',
      valor: 2,
      descricao: 'Delicioso brigadeiro de beijinho.',
    }, {
      id: 12,
      lojas_id: 2,
      nome: 'Beijinho com Uva',
      valor: 2.5,
      descricao: 'Delicioso brigadeiro de beijinho com uva.',
    }, {
      id: 13,
      lojas_id: 3,
      nome: 'Cachorro Quente Completão',
      valor: 7,
      descricao: 'Pão, maionese, duas salsichas, purê de batata, milho, ervilha, batata palha, ketchup e mostarda.',
    }, {
      id: 14,
      lojas_id: 3,
      nome: 'Cachorro Quente Simples',
      valor: 4.5,
      descricao: 'Pão, maionese, uma salsicha, batata palha, ketchup e mostarda.',
    }, {
      id: 15,
      lojas_id: 3,
      nome: 'Paçoca',
      valor: 0.5,
      descricao: 'Paçoca de amendoim.',
    }, {
      id: 16,
      lojas_id: 3,
      nome: 'Pipoca Salgada',
      valor: 3.5,
      descricao: 'Deliciosa pipoca com sal',
    }, {
      id: 17,
      lojas_id: 3,
      nome: 'Pipoca Doce',
      valor: 4.5,
      descricao: 'Pipoca doce (suco de groselha).',
    }, {
      id: 18,
      lojas_id: 3,
      nome: 'Canjica no Pote',
      valor: 3,
      descricao: '(300g) canjica no pote.',
    }, {
      id: 19,
      lojas_id: 3,
      nome: 'Arroz Doce no Pote',
      valor: 3,
      descricao: '(300g) arroz doce no pote.',
    }, {
      id: 20,
      lojas_id: 3,
      nome: 'Milho',
      valor: 3,
      descricao: 'Miho cozido.',
    }, {
      id: 21,
      lojas_id: 3,
      nome: 'Cural',
      valor: 6,
      descricao: 'Delicioso doce de milho.',
    }, {
      id: 22,
      lojas_id: 3,
      nome: 'Bolo de Milho Cremoso',
      valor: 7,
      descricao: 'Delicioso bolo de milho cremoso caseiro.',
    }, {
      id: 23,
      lojas_id: 3,
      nome: 'Doce de Batata Doce',
      valor: 1,
      descricao: 'Doce de Batata Doce em formato de coração.',
    }, {
      id: 24,
      lojas_id: 3,
      nome: 'Doce de Abóbora',
      valor: 1,
      descricao: 'Doce de Abóbora em formato de coração.',
    }, {
      id: 25,
      lojas_id: 3,
      nome: 'Pinhão',
      valor: 15,
      descricao: '(1KG) Pinhão cozido.',
    }, {
      id: 26,
      lojas_id: 3,
      nome: 'Quentão',
      valor: 20,
      descricao: '(1L) Pinga com gengibre.',
    }, {
      id: 27,
      lojas_id: 3,
      nome: 'Vinho Quente',
      valor: 20,
      descricao: '(1L) Vinho quente com pedaços de maçã.',
    }, {
      id: 28,
      lojas_id: 3,
      nome: 'Pé de Moleque',
      valor: 1.5,
      descricao: 'Delicioso doce de amendoim.',
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('produtos', null, {});
  }
};