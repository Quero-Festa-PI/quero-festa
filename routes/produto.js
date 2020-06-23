// Essas duas linhas podem ser resumidas em
// const router = require('express).Router();
var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest:'../public/uploads/'});

// Chamando o controller
const produtoController = require('../controllers/produtoController');

// Requisições produto
router.get('/buscar', produtoController.buscar);
router.get('/cadastrar-produto', produtoController.cadastrar);
router.post('/cadastrar-produto', upload.any('file', 5), produtoController.cadastro);

router.get('/:id', produtoController.show);

module.exports = router;
