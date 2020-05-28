module.exports = {
    pedido: (req, res) => {
        console.log(res.usuario);
        usuario = res.usuario;
        res.render('pedido', { page: 'pedido', usuario });
    },
    carrinho: (req, res) => {
        console.log(res.usuario);
        usuario = res.usuario;
        res.render('carrinho', { page: 'carrinho', usuario });
    },
    checkout: (req, res) => {
        console.log(res.usuario);
        usuario = res.usuario;
        res.render('checkout', { page: 'checkout', usuario });
    },
    confirmacao: (req, res) => {
        console.log(res.usuario);
        usuario = res.usuario;
        res.render('confirmacao', { page: 'confirmacao', usuario });
    }
}