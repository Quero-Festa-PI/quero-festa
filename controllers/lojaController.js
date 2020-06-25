const { sequelize, Usuario, Loja, Produto, ImagensDeProduto, AvaliacoesDeProdutos } = require('../database/models')
const bcrypt = require('bcrypt');

module.exports = {

     index: (req, res) => {
          return res.render('index', { page: 'Home' });
     },
     // Pagina da loja
     loja: async (req, res) => {
          let { id } = req.params;
          let lojaPerfil = await Loja.findByPk(id, {
               include:
                    [{
                         model: Usuario,
                         as: 'usuario'
                    }]
          });

          let avaliacaoLoja = await AvaliacoesDeProdutos.findAll({
               include: [{
                    model: Produto,
                    as: 'produtos',
                    where: { lojas_id: id },
               }],
               attributes: [
                    [sequelize.fn('avg', sequelize.col('classificacao')), 'media'],
                    [sequelize.fn('count', sequelize.col('classificacao')), 'quantidade'],
               ],
          })

          // buscar produtos no banco de dados
          let produtos = await Produto.findAll({
               where: { lojas_id: id },
               include: [{
                    model: AvaliacoesDeProdutos,
                    as: 'avaliacoes',
                    attributes: [
                         [sequelize.fn('avg', sequelize.col('classificacao')), 'media'],
                         [sequelize.fn('count', sequelize.col('classificacao')), 'quantidade']
                    ],
               }, {
                    model: ImagensDeProduto,
                    as: 'imagens',
                    attributes: ['image_url'],
                    limit: 1,
               }],
               group: ['avaliacoes.produtos_id'],
               attributes: ['id', 'nome', 'valor'],
          });

          return res.render('perfil-loja', { page: 'Perfil Loja', lojaPerfil, resultado: produtos, avaliacaoLoja });
     },

     alterarNavegacao: (req, res) => {
          req.session.navegacaoLoja = !req.session.navegacaoLoja;

          res.redirect(req.headers.referer.replace('http://localhost:3000', ""))
     }

}