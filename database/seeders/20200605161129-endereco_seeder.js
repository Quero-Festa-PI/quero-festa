'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('enderecos', [{
      id: 1,
      estado: 'SP',
      cidade: 'São Paulo',
      cep: '08502020',
      logradouro: 'Rua Kalil Nader Habr',
      numeral: 578,
      complemento: null,
      usuarios_id: 1,
    }, {
      id: 2,
      estado: 'SP',
      cidade: 'São Paulo',
      cep: '04184020',
      logradouro: 'Rua dos Cariris Novos',
      numeral: 225,
      complemento: 'Bloco 9 Apto 94',
      usuarios_id: 2,
    }, {
      id: 3,
      estado: 'SP',
      cidade: 'São Paulo',
      cep: '08952050',
      logradouro: 'Rua General Otávio Salema',
      numeral: 100,
      complemento: null,
      usuarios_id: 3,
    }, {
      id: 4,
      estado: 'SP',
      cidade: 'São Paulo',
      cep: '04154000',
      logradouro: 'Rua Coronel Silvério Magalhães',
      numeral: 485,
      complemento: 'Casa 3',
      usuarios_id: 4,
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('enderecos', null, {});
  }
};