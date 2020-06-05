'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('entregas', [{
      id: 1,
      data_prev: '2020-06-03',
      data_real: '2020-06-01'
    }, {
      id: 2,
      data_prev: '2020-06-03',
      data_real: '2020-06-05'
    }, {
      id: 3,
      data_prev: '2020-06-04',
      data_real: '2020-06-01'
    }, {
      id: 4,
      data_prev: '2020-06-05',
      data_real: '2020-06-04'
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('entregas', null, {});
  }
};