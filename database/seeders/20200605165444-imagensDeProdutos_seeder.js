'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('imagensDeProduto', [{
      id: 1,
      image_url: '/uploads/produtos/bolo-marvel.png',
      produtos_id: 1
    }, {
      id: 2,
      image_url: '/uploads/produtos/bolo-morango.jpg',
      produtos_id: 5
    }, {
      id: 3,
      image_url: '/uploads/produtos/bolo-sereia.png',
      produtos_id: 2
    }, {
      id: 4,
      image_url: '/uploads/produtos/bolo-pote-prestigio2.jpg',
      produtos_id: 2
    }, {
      id: 5,
      image_url: '/uploads/produtos/bolo-pote-oreo1.jpg',
      produtos_id: 3
    }, {
      id: 6,
      image_url: '/uploads/produtos/bolo-pote-oreo2.jpg',
      produtos_id: 3
    }, {
      id: 7,
      image_url: '/uploads/produtos/bolo-pote-limao1.jpg',
      produtos_id: 4
    }, {
      id: 8,
      image_url: '/uploads/produtos/bolo-pote-limao2.jpg',
      produtos_id: 4
    }, {
      id: 9,
      image_url: '/uploads/produtos/bolo-morango2.jpg',
      produtos_id: 5
    }, {
      id: 10,
      image_url: '/uploads/produtos/bolo-prestigio1.jpg',
      produtos_id: 6
    }, {
      id: 11,
      image_url: '/uploads/produtos/bolo-prestigio2.jpg',
      produtos_id: 6
    }, {
      id: 12,
      image_url: '/uploads/produtos/bolo-nutella.jpg',
      produtos_id: 7
    }, {
      id: 13,
      image_url: '/uploads/produtos/bolo-limao.jpg',
      produtos_id: 8
    }, {
      id: 14,
      image_url: '/uploads/produtos/brigadeiro.jpg',
      produtos_id: 9
    }, {
      id: 15,
      image_url: '/uploads/produtos/brigadeiro-morango.jpg',
      produtos_id: 10
    }, {
      id: 16,
      image_url: '/uploads/produtos/beijinho.jpg',
      produtos_id: 11
    }, {
      id: 17,
      image_url: '/uploads/produtos/beijinho-uva.jpg',
      produtos_id: 12
    }, {
      id: 18,
      image_url: '/uploads/produtos/cachorro-quente-completao.jpg',
      produtos_id: 13
    }, {
      id: 19,
      image_url: '/uploads/produtos/cachorro-quente-simples.jpg',
      produtos_id: 14
    }, {
      id: 20,
      image_url: '/uploads/produtos/pacoca.jpg',
      produtos_id: 15
    }, {
      id: 21,
      image_url: '/uploads/produtos/pipoca.jpg',
      produtos_id: 16
    }, {
      id: 22,
      image_url: '/uploads/produtos/pipoca-doce.jpg',
      produtos_id: 17
    }, {
      id: 23,
      image_url: '/uploads/produtos/canjica.jpg',
      produtos_id: 18
    }, {
      id: 24,
      image_url: '/uploads/produtos/arroz-doce.jpg',
      produtos_id: 19
    }, {
      id: 25,
      image_url: '/uploads/produtos/milho.jpg',
      produtos_id: 20
    }, {
      id: 26,
      image_url: '/uploads/produtos/cural.jpg',
      produtos_id: 21
    }, {
      id: 27,
      image_url: '/uploads/produtos/bolo-milho.jpg',
      produtos_id: 22
    }, {
      id: 28,
      image_url: '/uploads/produtos/doce-batata.jpg',
      produtos_id: 23
    }, {
      id: 29,
      image_url: '/uploads/produtos/doce-abobora.jpg',
      produtos_id: 24
    }, {
      id: 30,
      image_url: '/uploads/produtos/pinhao.jpg',
      produtos_id: 25
    }, {
      id: 31,
      image_url: '/uploads/produtos/quentao.jpg',
      produtos_id: 26
    }, {
      id: 32,
      image_url: '/uploads/produtos/vinho-quente.jpg',
      produtos_id: 27
    }, {
      id: 33,
      image_url: '/uploads/produtos/pe-de-moleque.jpg',
      produtos_id: 28
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('imagensDeProduto', null, {});
  }
};