var express = require('express');
var router = express.Router();



// Chamando os controllers 
const lojaController = require('../controllers/lojaController');
const produtoController = require ('../controllers/produtoController');

//Requisições loja
router.get ('/', lojaController.index);
router.get ('/logar', lojaController.logar);
router.get ('/cadastro', lojaController.cadastro);
router.get ('/painel-vendedor', lojaController.painelVendedor);
router.get ('/painel-cliente', lojaController.painelCliente);
router.get ('/loja', lojaController.loja);

// Requisições produtos
router.get ('/buscar' , produtoController.buscar);
router.get ('/cadastrar-produto', produtoController.cadastrar);

//Categorias
router.get ('/aniversario', produtoController.aniversario);
router.get('/bodas', produtoController.bodas);
router.get('/especiais', produtoController.especiais);
router.get('/comemoracoes', produtoController.comemoracoes);



module.exports = router;
