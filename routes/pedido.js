var express = require('express');
var router = express.Router();

// Chamando o controller
const pedidoController = require('../controllers/pedidoController');

// Requisição pedido
router.get('/pedido/:id', pedidoController.pedido);

router.get('/pedido/detalhes-pedido/:id', pedidoController.detalhesPedido);
router.get('/carrinho', pedidoController.carrinho);
router.post('/compre-tambem', pedidoController.compreTambem);
router.get('/checkout', pedidoController.checkout);
router.post('/cadastrar', pedidoController.cadastrar);
router.get('/confirmacao', pedidoController.confirmacao);

module.exports = router;