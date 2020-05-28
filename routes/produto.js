var express = require('express');
var router = express.Router();

// Chamando o controller
const produtoController = require('../controllers/produtoController');
const verificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

// Requisições produto
router.get('/produto', verificaUsuarioLogado, produtoController.produto);
router.get('/buscar', verificaUsuarioLogado, produtoController.buscar);
router.get('/cadastrar-produto', verificaUsuarioLogado, produtoController.cadastrar);

module.exports = router;
