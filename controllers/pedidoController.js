const { sequelize, Pedido, Usuario, Loja, Endereco, Pagamento, Entrega, PedidoProduto, Produto } = require('../database/models');

module.exports = {
    pedido: async (req, res) => {
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
            }, {
                model: PedidoProduto,
                as: 'listaDeProdutos',
                attributes: ['pedidos_id', 'produtos_id', 'quantidade']
            }, {
                model: Produto,
                as: 'produtos',
                through: { attributes: [] }
            }]
        });
        res.render('pedido', { page: 'pedido', pedido });
    },
    carrinho: (req, res) => {
        res.render('carrinho', { page: 'Carrinho' });
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
    confirmacao: (req, res) => {
        res.render('confirmacao', { page: 'Confirmacao' });
    }
}