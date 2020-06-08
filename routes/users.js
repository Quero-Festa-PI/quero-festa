var express = require('express');
var router = express.Router();

// Chamando o controller
const usuarioController = require('../controllers/usuarioController');

// Requisição usuário
router.get('/logar', usuarioController.login);
router.post('/logar', usuarioController.logar);
router.get('/cadastro', usuarioController.cadastro);
router.post('/cadastro', usuarioController.cadastrar);
router.get('/perfil-vendedor', usuarioController.perfilVendedor);
router.get('/perfil-cliente', usuarioController.perfilCliente);
router.get('/editar-cliente/:id', usuarioController.alter);
router.put('/editar-cliente/:id', usuarioController.update);
router.get('/dashboard', usuarioController.dashboard);
router.get('/sair', usuarioController.sair);



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
