var express = require('express');
var router = express.Router();



// Chamando os controllers 
const lojaController = require('../controllers/lojaController');
const produtoController = require('../controllers/produtoController');

//Requisições loja
router.get('/', lojaController.index);
router.get('/logar', lojaController.login);
router.post('/logar', lojaController.logar);
router.get('/cadastro', lojaController.cadastro);
router.post('/cadastro', lojaController.cadastrar);
router.get('/dashboard', lojaController.dashboard);
router.get('/perfil-cliente', lojaController.perfilCliente);
router.get('/cliente-cadastro', lojaController.clienteCadastro);
router.get('/loja', lojaController.loja);

// Requisições produtos
router.get('/buscar', produtoController.buscar);
router.get('/cadastrar-produto', produtoController.cadastrar);

// Usuarios
router.get('/perfil-vendedor', lojaController.perfilVendedor);


router.get('/carrinho', function (req, res, next) {
  res.render('carrinho', { page: 'carrinho', menuId: 'carrinho' });
});
router.get('/checkout', function (req, res, next) {
  res.render('checkout', { page: 'checkout', menuId: 'checkout' });
});
router.get('/confirmacao', function (req, res, next) {
  res.render('confirmacao', { page: 'confirmacao', menuId: 'confirmacao' });
});


// ## Não sei fazer bonitinho, sorry Leo ## 
router.get('/produto', function (req, res, next) {
  res.render('produto', { page: 'produto', menuId: 'produto' });
});

// ## Não sei fazer bonitinho, sorry Leo ## 
router.get('/pedido', function (req, res, next) {
  res.render('pedido', { page: 'pedido', menuId: 'pedido' });
});


module.exports = router;
