var express = require('express');
var router = express.Router();

// Chamando o controller
const pedidoController = require('../controllers/pedidoController');
const verificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

// Requisição pedido
router.get('/pedido', verificaUsuarioLogado, pedidoController.pedido);
router.get('/carrinho', verificaUsuarioLogado, pedidoController.carrinho);
router.get('/checkout', verificaUsuarioLogado, pedidoController.checkout);
router.get('/confirmacao', verificaUsuarioLogado, pedidoController.confirmacao);



module.exports = router;