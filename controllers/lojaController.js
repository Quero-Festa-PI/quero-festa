const { sequelize, Usuario } = require('../database/models')
const bcrypt = require('bcrypt');

module.exports = {

     index: (req, res) => {
          return res.render('index', { page: 'Home' });
     },
     // Pagina da loja
     loja: (req, res, ) => {
          return res.render('perfil-loja', { page: 'Perfil Loja' });
     }

}