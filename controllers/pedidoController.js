module.exports = {
    pedido: (req, res) => {
        res.render('pedido', { page: 'pedido' });
    },
    carrinho: (req, res) => {
        res.render('carrinho', { page: 'carrinho' });
    },
    checkout: (req, res) => {
        res.render('checkout', { page: 'checkout' });
    },
    confirmacao: (req, res) => {
        res.render('confirmacao', { page: 'confirmacao' });
    }
}