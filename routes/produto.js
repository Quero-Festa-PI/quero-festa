var express = require('express');
var router = express.Router();

// Chamando o controller
const produtoController = require('../controllers/produtoController');

// Requisições produto
router.get('/buscar', produtoController.buscar);
router.get('/cadastrar-produto', produtoController.cadastrar);
router.get('/:id', produtoController.show);
// router.post('/cadastrar-produto', produtoController.cadastrar);

module.exports = router;
