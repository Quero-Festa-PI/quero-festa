'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('produtos', [{
      id: 1,
      lojas_id: 1,
      nome: 'Bolo de Pote - Morango',
      valor: 5,
      disponibilidade: true,
      descricao: 'Bolo de pote de 250g sabor morango. Uma delícia!',
      avaliacao: 4.8
    }, {
      id: 2,
      lojas_id: 1,
      nome: 'Bolo de Pote - Prestígio',
      valor: 5,
      disponibilidade: true,
      descricao: 'Bolo de pote de 250g sabor prestígio. O queridinho!',
      avaliacao: 5
    }, {
      id: 3,
      lojas_id: 2,
      nome: 'Brigadeiro de Nutella com Leite Ninho',
      valor: 7.5,
      disponibilidade: true,
      descricao: 'Delicioso brigadeiro de nutella com leite ninho, e um toque de gotas de ouro.',
      avaliacao: 5
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('produtos', null, {});
  }
};