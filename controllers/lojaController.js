const { sequelize, Usuario } = require('../database/models')
const bcrypt = require('bcrypt');

module.exports = {

     index: (req, res) => {
          return res.render('index', { page: 'Home' });
     },
     // Pagina da loja
     loja: (req, res, ) => {
          return res.render('perfil-loja', { page: 'Perfil Loja' });
     },

     alterarNavegacao: (req, res) => {
          req.session.navegacaoLoja = !req.session.navegacaoLoja;

          res.redirect(req.headers.referer.replace('http://localhost:3000', ""))
     }

}