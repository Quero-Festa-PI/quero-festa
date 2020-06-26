var express = require('express');
var router = express.Router();

// Chamando o controller 
const indexController = require('../controllers/indexController');

//Requisições index
router.get('/', indexController.index);
router.get('/alterar-navegacao', indexController.alterarNavegacao);

module.exports = router;
