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
          console.log(lojaPerfil.imagem);

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
          const { id } = req.params;

          let arquivo = req.file;
          let img;
          let infosLoja = await Loja.findByPk(id);

          if (!arquivo) {
               img = infosLoja.imagem;
          } else {
               let file = req.file.originalname;
               img = `/uploads/loja/${file}`;
          }

          const { nome, descricao, telefone, email } = req.body;

          let lojaUpdate = await Loja.update({
               imagem: img,
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

          if (err == 2) {
               err = 'Email já existe';
          }

          return res.render('cadastrar-loja', { page: 'Cadastrar Loja', err });
     },
     cadastrar: async (req, res) => {
          let file = req.file.originalname;
          let img = `/uploads/loja/${file}`;

          let { nome, telefone, email, descricao } = req.body;
          let usuario = req.session.usuario;

          if (!usuario) {
               return res.redirect('/usuarios/logar');
          }

          let lojaExistente = await Loja.findOne({ where: { email } });
          if ((lojaExistente)) {
               return res.redirect('/lojas/cadastrar-loja?error=2');
          };

          if (!nome) {
               return res.redirect('/lojas/cadastrar-loja?error=1');
          }

          let novaLoja = await Loja.create({
               imagem: img,
               nome,
               telefone,
               email,
               descricao,
               usuarios_id: req.session.usuario.id
          })

          req.session.loja = novaLoja;

          return res.redirect(`/lojas/perfil-loja/${novaLoja.id}`);
     },
     dashboard: async (req, res,) => {

          let lojaLogada = res.locals.loja;

          if (!lojaLogada) {
               req.session.urlPosLogin = req.originalUrl;
               res.redirect('/usuarios/logar');
          }

          let pedidos = await Pedido.findAll({
               include: [{
                    model: Entrega,
                    as: 'entrega',
                    attributes: ['data_prev'],
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
               attributes: ['id', 'lojas_id'],
               where: Sequelize.literal('`Pedido`.`lojas_id` = ' + lojaLogada.id + ' AND `entrega`.`data_real` IS NULL'),
          });

          let atrasados = [];
          let proximos = [];

          function formatarObjetos(pedidos) {
               pedidos.forEach(pedido => {
                    pedido = pedido.toJSON();
                    delete pedido.lojas_id;
                    pedido.entrega = pedido.entrega.data_prev;
                    pedido.pagamento = pedido.pagamento.status;
                    pedido.listaDeProdutos = pedido.listaDeProdutos.map(produto => {
                         produto.nome = produto.produtos.nome;
                         delete produto.produtos;
                         return produto;
                    });
                    pedido.entrega > new Date() ? proximos.push(pedido) : atrasados.push(pedido);
               });
          }

          formatarObjetos(pedidos);

          let totalVendido = await Pedido.findOne({
               attributes: [
                    [Sequelize.literal('SUM(`valor_total`)'), 'soma'],
                    [Sequelize.literal(`COUNT(*)`), 'qtd']
               ],
               where: { lojas_id: 3 }
          });

          totalVendido = totalVendido.toJSON();

          res.render('dashboard', { page: 'Dashboard', totalVendido, proximos, atrasados });
     },
     dashboardGrafico: async (req, res) => {

          let { grafico } = req.params;

          if (grafico == "vendasLoja") {
               let { ano, id } = req.query;
               let resultadosMensais = await Pedido.findAll({
                    attributes: [
                         [Sequelize.literal('YEAR(`createdAt`)'), 'ano'],
                         [Sequelize.literal('MONTH(`createdAt`)'), 'mes'],
                         [Sequelize.literal('SUM(`valor_total`)'), 'soma'],
                         [Sequelize.literal(`COUNT(*)`), 'qtdVendas']
                    ],
                    group: ['mes', 'ano'],
                    where: { lojas_id: id }
               })

               // montar dicionário com relação de vendas por mes/ano
               var mapResultadosMensais = new Map();
               resultadosMensais.forEach(resultado => {
                    resultado = resultado.toJSON();
                    mapResultadosMensais.set(`${resultado.ano}-${resultado.mes}`, {
                         soma: resultado.soma,
                         qtdVendas: resultado.qtdVendas
                    });
               })

               let qtdVendas = [];
               let somaVendas = [];

               for (let i = 1; i < 13; i++) {
                    qtdVendas.push(mapResultadosMensais.has(`${ano}-${i}`) ? mapResultadosMensais.get(`${ano}-${i}`).qtdVendas : 0);
                    somaVendas.push(mapResultadosMensais.has(`${ano}-${i}`) ? mapResultadosMensais.get(`${ano}-${i}`).soma : 0);
               }

               return res.send({ qtdVendas, somaVendas });
          }

          if (grafico == "vendasProduto") {
               var { periodo, id } = req.query;
               var whereString;
               var groupString;
               var ano;
               var mes;

               if (periodo != 1) {
                    ano = periodo.slice(0, 4);
                    mes = periodo.slice(4, 5);
                    if (mes) {
                         whereString = '`pedidos`.`lojas_id` = ' + id + ' AND YEAR(createdAt) = ' + ano + ' AND MONTH(createdAt) = ' + mes;
                         groupString = 'YEAR(createdAt), MONTH(createdAt), `produtos_id`'
                    } else {
                         whereString = '`pedidos`.`lojas_id` = ' + id + ' AND YEAR(createdAt) = ' + ano;
                         groupString = 'YEAR(createdAt), `produtos_id`'
                    }
               } else {
                    whereString = '`pedidos`.`lojas_id` = ' + id;
                    groupString = '`produtos_id`'
               }

               let resultados = await PedidoProduto.findAll({
                    include: [{
                         model: Produto,
                         as: 'produtos',
                         attributes: ['id', 'nome', 'valor'],
                    }, {
                         model: Pedido,
                         as: 'pedidos',
                         attributes: [
                              'lojas_id',
                              'createdAt',
                              [Sequelize.literal('MONTH(createdAt)'), 'mes'],
                              [Sequelize.literal('YEAR(createdAt)'), 'ano'],
                         ]
                    }],
                    attributes: [
                         'produtos_id',
                         [Sequelize.literal('COUNT(produtos_id)'), 'contador'],
                         [Sequelize.literal('SUM(quantidade)'), 'soma'],
                         [Sequelize.literal('SUM(quantidade) * `produtos`.`valor`'), 'total'],
                    ],
                    group: [Sequelize.literal(groupString)],
                    where: Sequelize.literal(whereString),
                    order: Sequelize.literal('`total` DESC'),
               });

               let labels = [];
               let datasetGanhos = [];
               let datasetQuantidade = [];
               let datasetPedidos = [];

               for (let i = 0; i < resultados.length; i++) {
                    var produto = resultados[i];
                    produto = produto.toJSON();
                    labels.push(produto.produtos.nome);
                    datasetGanhos.push(produto.total);
                    datasetQuantidade.push(produto.soma);
                    datasetPedidos.push(produto.contador);
               }

               resultados = {
                    labels,
                    datasetGanhos,
                    datasetQuantidade,
                    datasetPedidos,
               }

               return res.send(resultados)
          }
     },
     deletar: async (req, res) => {
          const { id } = req.params;

          await Loja.destroy({ where: { id } });
          req.session.loja = null; res.locals.loja = null; req.session.navegacaoLoja = false; res.locals.navegacaoLoja = false;

          const idUsuario = res.locals.usuario.id;
          return res.redirect(`/usuarios/perfil-cliente/${idUsuario}`)
     },
}