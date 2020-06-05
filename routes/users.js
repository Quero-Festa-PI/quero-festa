var express = require('express');
var router = express.Router();

// Chamando o controller
const usuarioController = require('../controllers/usuarioController');
const verificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

// Requisição usuário
router.get('/logar', usuarioController.login);
router.post('/logar', usuarioController.logar);
router.get('/cadastro', usuarioController.cadastro);
router.post('/cadastro', usuarioController.cadastrar);
router.get('/perfil-vendedor', verificaUsuarioLogado, usuarioController.perfilVendedor);
router.get('/perfil-cliente', verificaUsuarioLogado, usuarioController.perfilCliente);
router.get('/editar-cliente/:id', verificaUsuarioLogado, usuarioController.alter);
router.put('/editar-cliente/:id', verificaUsuarioLogado, usuarioController.update);
router.get('/dashboard', verificaUsuarioLogado, verificaUsuarioLogado, usuarioController.dashboard);
router.get('/sair', verificaUsuarioLogado, usuarioController.sair);



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
