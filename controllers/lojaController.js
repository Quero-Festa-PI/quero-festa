const { sequelize, Usuario } = require('../database/models')
const bcrypt = require('bcrypt');

module.exports = {

     index: (req, res) => {
          console.log(res.usuario);
          usuario = res.usuario;
          return res.render('index', { page: 'Home', usuario });
     },
     // Pagina da loja
     loja: (req, res, ) => {
          usuario = res.usuario;
          res.render('perfil-loja', { page: 'Perfil Loja', usuario });
     }

}