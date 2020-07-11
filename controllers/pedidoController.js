const { sequelize, ImagensDeProduto, AvaliacoesDeProdutos, Pedido, Usuario, Loja, 
    Endereco, Pagamento, Entrega, PedidoProduto, Produto } = require('../database/models');

var moment = require('moment');

module.exports = {
    pedido: async (req, res) => {
        let usuario = req.session.usuario;

        if(!usuario){
            return res.redirect('/usuarios/logar');
        }

        let pedidos = await Pedido.findAll({
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['nome', 'sobrenome']
            }, {
                model: Loja,
                as: 'loja',
                attributes: ['nome']
            }, {
                model: Endereco,
                as: 'endereco',
                attributes: ['estado', 'cidade', 'cep', 'logradouro', 'numeral', 'complemento']
            }, {
                model: Pagamento,
                as: 'pagamento',
                attributes: ['forma_pagamento', 'status']
            }, {
                model: Entrega,
                as: 'entrega',
                attributes: ['data_prev']
            }, {
                model: PedidoProduto,
                as: 'listaDeProdutos',
                attributes: ['produtos_id', 'quantidade'],
                include: [{
                     model: Produto,
                     as: 'produtos',
                     attributes: ['nome', 'valor']
                }]
           }],
            where: {usuarios_id: usuario.id}
        });

        let pedidosRealizados = [];
        
        function lerPedidos(pedidos) {
            pedidos.forEach(pedido => {
                pedido = pedido.toJSON();
                delete pedido.usuarios_id;
                delete pedido.lojas_id;
                delete pedido.enderecos_id;
                delete pedido.pagamentos_id;
                delete pedido.entregas_id;
                pedido.loja = pedido.loja.nome;
                pedido.endereco = pedido.endereco.logradouro +', '+ pedido.endereco.numeral +' '+
                pedido.endereco.complemento +' '+ pedido.endereco.cidade +' - '+ 
                pedido.endereco.estado +' '+ pedido.endereco.cep;
                pedido.usuario = pedido.usuario.nome +' '+ pedido.usuario.sobrenome;
                pedido.pagamento = pedido.pagamento.status;
                pedido.entrega = pedido.entrega.data_prev;
                pedido.listaDeProdutos = pedido.listaDeProdutos.map(produto => {
                    produto.nome = produto.produtos.nome;
                    produto.valor = produto.produtos.valor;
                    delete produto.produtos_id;
                    delete produto.produtos;

                    return produto;  
                });
                    
                pedidosRealizados.push(pedido);
            }) 
        }

        lerPedidos(pedidos);

        res.render('pedido', { page: 'Meus Pedidos', usuario, pedidosRealizados: pedidosRealizados, moment: moment });
    },
    detalhesPedido: async (req, res) => {
        let usuario = req.session.usuario;
        let {id} = req.params;

        if(!usuario){
            return res.redirect('/usuarios/logar');
        }

        let pedido = await Pedido.findOne({
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['nome', 'sobrenome']
            }, {
                model: Loja,
                as: 'loja',
                attributes: ['nome']
            }, {
                model: Endereco,
                as: 'endereco',
                attributes: ['estado', 'cidade', 'cep', 'logradouro', 'numeral', 'complemento']
            }, {
                model: Pagamento,
                as: 'pagamento',
                attributes: ['forma_pagamento', 'status']
            }, {
                model: Entrega,
                as: 'entrega',
                attributes: ['data_prev', 'data_real']
            }],
            where: {id}
        });

        let listaProdutos = await PedidoProduto.findAll ({
            include: [{
                model: Produto,
                as: 'produtos',
                attributes: ['nome', 'valor'],
                include:[{
                    model: ImagensDeProduto,
                    as: 'imagens',
                    attributes: ['image_url']
                }]
           }],
           where: { pedidos_id: id }

        })

        res.render('detalhes-pedido', {page: 'Detalhes do Pedido', usuario, pedido, listaProdutos, moment: moment});
    },
    carrinho: async (req, res) => {

        // consultar os 12 produtos mais vendidos do site
        let produtos = await PedidoProduto.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('quantidade')), 'quantidade_vendida'],
                'produtos_id',
            ],
            order: sequelize.literal('sum(quantidade) DESC'),
            group: ['produtos_id'],
            limit: 4,
            include: [{
                model: Produto,
                as: 'produtos',
                attributes: ['id', 'nome', 'valor'],
                include: [{
                    model: ImagensDeProduto,
                    as: 'imagens',
                    attributes: ['image_url'],
                    limit: 1,
                }],
            }]
        })

        // consultar avaliações
        let avaliacoes = await Produto.findAll({
            include: [{
                model: AvaliacoesDeProdutos,
                as: 'avaliacoes',
                attributes: [
                    [sequelize.fn('avg', sequelize.col('classificacao')), 'media'],
                    [sequelize.fn('count', sequelize.col('classificacao')), 'quantidadeAvaliacoes']
                ],
            }],
            group: ['avaliacoes.produtos_id'],
            attributes: ['id'],
        });

        // incluir avaliacoes nos objetos dos produtos
        produtos = produtos.map(produto => {
            produto = produto.toJSON();
            let avaliacaoP = avaliacoes.find(avaliacao => {
                avaliacao = avaliacao.toJSON();
                return avaliacao.id == produto.produtos_id;
            })
            if (avaliacaoP) {
                avaliacaoP = avaliacaoP.avaliacoes;
                produto.avaliacoes = avaliacaoP[0];
            } else {
                produtos.avaliacoes = '';
            }
            return produto;
        });

        // formatar objeto de resposta para o front-end
        function formatarObjeto(objetos) {
            objetos = objetos.map(objeto => {
                delete objeto.produtos.id;
                delete objeto.quantidade_vendida;
                objeto.id = objeto.produtos_id;
                delete objeto.produtos_id;
                objeto.nome = objeto.produtos.nome;
                objeto.valor = objeto.produtos.valor;
                if (objeto.produtos.imagens[0]) {
                    objeto.imagem = objeto.produtos.imagens[0].image_url;
                }
                delete objeto.produtos;
                if (objeto.avaliacoes) {
                    objeto.avaliacoes = objeto.avaliacoes.toJSON();
                }
                return objeto;
            })
            return objetos;
        }

        // formatar objeto de resposta para o front-end
        produtos = formatarObjeto(produtos);

        res.render('carrinho', { page: 'Carrinho', produtos });
    },
    checkout: async (req, res) => {
        let usuario = req.session.usuario;
        if (!usuario) {
            res.redirect('/usuarios/logar');
        }
        let endereco = await Endereco.findOne({
            where: { usuarios_id: usuario.id }
        })
        if (!endereco) {
            res.redirect('../usuarios/perfil-cliente/2');
        }
        res.render('checkout', { page: 'Checkout', endereco });
    },
    cadastrar: async (req, res) => {

        const { produtos, pagamento, idEndereco, lojas } = req.body;
        const numerosDosPedidos = [];
        for (let i = 0; i < lojas.length; i++) {
            const loja = lojas[i];

            // filtrar produtos da loja
            const produtosDoPedido = produtos.filter(produto => {
                return produto.loja_id == loja;
            });

            let valor_total = 0;

            for (let j = 0; j < produtosDoPedido.length; j++) {
                const produto = produtosDoPedido[j];
                valor_total += produto.valor * produto.quantidade;
            }

            // cadastrar pagamento
            let registroPagamento = await Pagamento.create({
                forma_pagamento: pagamento,
            });

            // cadastrar entrega
            let data_prev = new Date();
            data_prev.setDate(data_prev.getDate() + 5);
            let registroEntrega = await Entrega.create({
                data_prev,
            });

            // cadastrar pedido
            // id usuario, id loja, id endereço, id pagamento, id entrega, valor valor total,
            let registroPedido = await Pedido.create({
                usuarios_id: res.locals.usuario.id,
                lojas_id: loja,
                enderecos_id: idEndereco,
                pagamentos_id: registroPagamento.id,
                entregas_id: registroEntrega.id,
                valor_total,
            })

            // cadastrar produtos pedidos
            for (let k = 0; k < produtosDoPedido.length; k++) {
                const produto = produtosDoPedido[k];
                await PedidoProduto.create({
                    pedidos_id: registroPedido.id,
                    produtos_id: produto.id,
                    quantidade: produto.quantidade,
                })
            }
            numerosDosPedidos.push(registroPedido.id);
        }
        console.log(numerosDosPedidos);
        res.send(numerosDosPedidos);
    },
    confirmacao: async (req, res) => {
        let usuario = req.session.usuario;

        if(!usuario){
            return res.redirect('/usuarios/logar');
        }

        let { ids } = req.query
        ids = ids.split(',');

        let pedidos = await Pedido.findAll({
            include: {
                model: Loja,
                as: 'loja',
                attributes: ['nome', 'email', 'telefone']
            },
            where: { id: ids }
        })
        // return res.send(pedido[0].loja);
        res.render('confirmacao', { page: 'Confirmacao', ids, pedidos });
    }
}