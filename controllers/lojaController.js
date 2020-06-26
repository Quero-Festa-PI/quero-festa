const { sequelize, Usuario, Loja, Produto, ImagensDeProduto, AvaliacoesDeProdutos } = require('../database/models')
const bcrypt = require('bcrypt');

module.exports = {
     // Pagina da loja
     show: async (req, res) => {
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
     edit: async (req, res) => {

          const { id } = req.params;

          const lojaLogada = res.locals.loja;

          if (!lojaLogada) {
               return res.redirect('/');
          }

          if (lojaLogada.id != id) {
               return res.redirect(`/lojas/editar-loja/${lojaLogada.id}`);
          }

          const infosLoja = await Loja.findByPk(id);

          return res.render('editar-loja', { page: 'Editar Loja', infosLoja })
     },
     update: async (req, res) => {

          const { id, nome, descricao } = req.body;

          console.log(`${id} ${nome} ${descricao}`);

          let lojaUpdate = await Loja.update({
               nome,
               descricao,
          }, {
               where: { id }
          });

          return res.redirect(`/lojas/perfil-loja/${id}`);
     }
}