const { sequelize, Usuario, Loja, Produto} = require('../database/models')
const bcrypt = require('bcrypt');

module.exports = {

     index: (req, res) => {
          return res.render('index', { page: 'Home' });
     },
     // Pagina da loja
     loja: async (req, res ) => {
          let {nome} = req.params;
          let loja = await Loja.findOne({               
              include: 
              [{
                   model: Produto,
                   as: 'produtos'                   
               },               
               {
                    model: Usuario,
                    as: 'usuario'
               }]              
          })

          return res.render('perfil-loja', { page: 'Perfil Loja', loja });
     },

     alterarNavegacao: (req, res) => {
          req.session.navegacaoLoja = !req.session.navegacaoLoja;

          res.redirect(req.headers.referer.replace('http://localhost:3000', ""))
     }

}