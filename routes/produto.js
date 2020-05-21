var express = require('express');
var router = express.Router();

// Chamando o controller
const produtoController = require('../controllers/produtoController');

// Requisições produto
router.get('/produto', produtoController.produto);
router.get('/buscar', produtoController.buscar);
router.get('/cadastrar-produto', produtoController.cadastrar);

module.exports = router;
