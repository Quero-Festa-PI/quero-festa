const { sequelize, Usuario } = require('../models')
const bcrypt = require('bcrypt');

module.exports = {

     index: (req, res) => {
          console.log(req.session.usuario);
          let usuario = "";
          if (req.session.usuario) {
               usuario = req.session.usuario;
          }
          return res.render('index', { page: 'Home', usuario });
     },     
     // Pagina da loja
     loja: (req, res, ) => {
          res.render('perfil-loja', { page: 'perfil-loja' });
     }

}