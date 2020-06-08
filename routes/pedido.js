var express = require('express');
var router = express.Router();

// Chamando o controller
const pedidoController = require('../controllers/pedidoController');

// Requisição pedido
router.get('/pedido', pedidoController.pedido);
router.get('/carrinho', pedidoController.carrinho);
router.get('/checkout', pedidoController.checkout);
router.get('/confirmacao', pedidoController.confirmacao);



module.exports = router;