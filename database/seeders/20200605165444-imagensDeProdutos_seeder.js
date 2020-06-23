'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('imagensDeProduto', [{
      id: 1,
      image_url: '/uploads/produtos/bolo1.jpg',
      produtos_id: 1
    }, {
      id: 2,
      image_url: '/uploads/produtos/bolo2.jpg',
      produtos_id: 1
    }, {
      id: 3,
      image_url: '/uploads/produtos/bolo3.jpg',
      produtos_id: 2
    }, {
      id: 4,
      image_url: '/uploads/produtos/bolo4.jpg',
      produtos_id: 2
    }, {
      id: 5,
      image_url: '/uploads/produtos/brigadeiro1.jpg',
      produtos_id: 3
    }, {
      id: 6,
      image_url: '/uploads/produtos/brigadeiro2.jpg',
      produtos_id: 3
    }, {
      id: 7,
      image_url: '/uploads/produtos/bolo5.jpg',
      produtos_id: 4
    }, {
      id: 8,
      image_url: '/uploads/produtos/bolo6.jpg',
      produtos_id: 4
    }, {
      id: 9,
      image_url: '/uploads/produtos/bolo7.jpg',
      produtos_id: 5
    }, {
      id: 10,
      image_url: '/uploads/produtos/bolo8.jpg',
      produtos_id: 5
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('imagensDeProduto', null, {});
  }
};