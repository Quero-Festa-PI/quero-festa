const { sequelize, Sequelize, Usuario, Loja, Pedido, Produto, ImagensDeProduto, AvaliacoesDeProdutos, Entrega, Pagamento, PedidoProduto } = require('../database/models')
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

          const { id, nome, descricao, telefone, email } = req.body;

          console.log(`${id} ${nome} ${descricao}`);

          let lojaUpdate = await Loja.update({
               nome,
               descricao,
               telefone,
               email
          }, {
               where: { id }
          });

          return res.redirect(`/lojas/perfil-loja/${id}`);
     },
     cadastro: (req, res) => {
          let err = req.query.error
          if (err == 1) {
               err = 'Informe um nome para sua loja'
          }
          return res.render('cadastrar-loja', { page: 'Cadastrar Loja', err });
     },
     cadastrar: async (req, res) => {
          let { nome, telefone, email, descricao } = req.body;
          // let image = req.files.originalname;
          // let img = `/uploads/${image}`;
          let usuario = req.session.usuario;

          if (!usuario) {
               return res.redirect('/usuarios/logar');
          }

          if (!nome) {
               return res.redirect('/lojas/cadastrar-loja?error=1');
          }

          let novaLoja = await Loja.create({
               // imagem: img,
               nome,
               telefone,
               email,
               descricao,
               usuarios_id: usuario.id
          })
          return res.redirect(`/lojas/perfil-loja/${novaLoja.id}`);
     },
     dashboard: async (req, res,) => {
          let { id } = req.params;

          let pedidos = await Pedido.findAll({
               include: [{
                    model: Entrega,
                    as: 'entrega',
                    attributes: ['data_prev', 'data_real']
               }, {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nome', 'sobrenome', 'celular']
               }, {
                    model: Pagamento,
                    as: 'pagamento',
                    attributes: ['status']
               }, {
                    model: PedidoProduto,
                    as: 'listaDeProdutos',
                    attributes: ['produtos_id', 'quantidade'],
                    include: [{
                         model: Produto,
                         as: 'produtos',
                         attributes: ['nome']
                    }]
               }],
               attributes: ['id', 'valor_total', 'lojas_id'],
               where: { lojas_id: id },
          });

          pedidos = pedidos.map(pedido => pedido.toJSON());

          function formatarObjetos(objetos) {

               objetos = objetos.map(objeto => {
                    objeto.listaDeProdutos.forEach(produto => {
                         produto.nome = produto.produtos.nome;
                         delete produto.produtos
                    });
                    objeto.pagamento = objeto.pagamento.status;
                    return objeto;
               });
               return objetos;
          }

          pedidos = formatarObjetos(pedidos);

          let totalVendido = await Pedido.findOne({
               attributes: [
                    [Sequelize.literal('SUM(`valor_total`)'), 'soma'],
                    [Sequelize.literal(`COUNT(*)`), 'qtd']
               ],
               where: { lojas_id: id }
          });

          totalVendido = totalVendido.toJSON();

          res.render('dashboard', { page: 'Dashboard', pedidos, totalVendido });
     }
}