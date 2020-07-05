'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [{
      id: 1,
      nome: 'Bianca',
      sobrenome: 'Pereira Santos',
      email: 'bianca@querofesta.com.br',
      celular: '(11)91111-1111',
      senha: bcrypt.hashSync('123456', 10),
      cpf: '12312312312',
      data_nasc: '1995-12-22',
      sexo: 'F',
      imagem: '/uploads/perfil/user.png'
    }, {
      id: 2,
      nome: 'Leonardo',
      sobrenome: 'de Abreu Navarro',
      email: 'navarro@querofesta.com.br',
      celular: '(11)92222-2222',
      senha: bcrypt.hashSync('123456', 10),
      cpf: '43200227850',
      data_nasc: '2000-03-12',
      sexo: 'M',
      imagem: '/uploads/perfil/navarro.png'
    }, {
      id: 3,
      nome: 'Leonardo',
      sobrenome: 'Carvalho',
      email: 'carvalho@querofesta.com.br',
      celular: '(11)93333-3333',
      senha: bcrypt.hashSync('123456', 10),
      cpf: '32132132132',
      data_nasc: '1990-04-01',
      sexo: 'M',
      imagem: '/uploads/perfil/carvalho.png'
    }, {
      id: 4,
      nome: 'Melody',
      sobrenome: 'Gomes',
      email: 'melody@querofesta.com.br',
      celular: '(11)94444-4444',
      senha: bcrypt.hashSync('123456', 10),
      cpf: '21321321321',
      data_nasc: '1995-08-01',
      sexo: 'F',
      imagem: '/uploads/perfil/melody.png'
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
