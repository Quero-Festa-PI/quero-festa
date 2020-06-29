const {sequelize, Pedido, Usuario, Loja, Endereco, Pagamento, Entrega, PedidoProduto, Produto} = require('../database/models');

module.exports = {
    pedido: async (req, res) => {
        let pedido = await Pedido.findOne({
            include:[{
                model: Usuario,
                as: 'usuario',
                attributes: ['nome', 'sobrenome']
            },{
                model: Loja,
                as: 'loja',
                attributes: ['nome']
            },{
                model: Endereco,
                as: 'endereco',
                attributes: ['estado', 'cidade', 'cep', 'logradouro', 'numeral', 'complemento']
            },{
                model: Pagamento,
                as: 'pagamento',
                attributes: ['forma_pagamento', 'status']
            },{
                model: Entrega,
                as: 'entrega',
                attributes: ['data_prev', 'data_real']
            }, {
                model: PedidoProduto,
                as: 'listaDeProdutos',
                attributes: ['pedidos_id', 'produtos_id', 'quantidade']
            },{
                model: Produto,
                as: 'produtos',
                through: {attributes: []}
            }]
        });
        res.render('pedido', { page: 'pedido', pedido });
    },
    carrinho: (req, res) => {
        res.render('carrinho', { page: 'carrinho' });
    },
    checkout: async (req, res) => {
        let usuario = req.session.usuario;
        let endereco = await Endereco.findOne({
            where: {usuarios_id: usuario.id}
        })

        let pedido = await Pedido.findOne({
            include: {
                model: Produto,
                as: 'produtos',
                through: {attributes: []}
            }
        })
        res.render('checkout', { page: 'checkout', endereco, pedido });
    },
    confirmacao: (req, res) => {
        res.render('confirmacao', { page: 'confirmacao' });
    }
}