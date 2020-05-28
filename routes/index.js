var express = require('express');
var router = express.Router();

// Chamando o controller 
const lojaController = require('../controllers/lojaController');
const verificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

//Requisições loja
router.get('/', verificaUsuarioLogado, lojaController.index);
router.get('/loja', verificaUsuarioLogado, lojaController.loja);

module.exports = router;
