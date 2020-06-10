var express = require('express');
var router = express.Router();

// Chamando o controller 
const lojaController = require('../controllers/lojaController');

//Requisições loja
router.get('/', lojaController.index);
router.get('/loja', lojaController.loja);
router.get('/alterar-navegacao', lojaController.alterarNavegacao);

module.exports = router;
