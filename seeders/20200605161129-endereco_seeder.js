'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('enderecos', [{
      id: 1,
      estado: 'SP',
      cidade: 'São Paulo',
      cep: '00000001',
      logradouro: 'Rua dos Bobos',
      numeral: 0,
      complemento: null,
      usuarios_id: 1
    }, {
      id: 2,
      estado: 'MG',
      cidade: 'Minas Gerais',
      cep: '00000002',
      logradouro: 'Rua das Bobas',
      numeral: 0,
      complemento: null,
      usuarios_id: 1
    }, {
      id: 3,
      estado: 'SP',
      cidade: 'São Paulo',
      cep: '00000003',
      logradouro: 'Rua dos Boboes',
      numeral: 0,
      complemento: null,
      usuarios_id: 2
    }, {
      id: 4,
      estado: 'SP',
      cidade: 'São Paulo',
      cep: '00000004',
      logradouro: 'Rua das Bobonas',
      numeral: 0,
      complemento: null,
      usuarios_id: 3
    }, {
      id: 5,
      estado: 'SP',
      cidade: 'São Paulo',
      cep: '00000005',
      logradouro: 'Rua dos Bobocas',
      numeral: 0,
      complemento: null,
      usuarios_id: 4
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('enderecos', null, {});
  }
};