var express = require('express');
var router = express.Router();

// Chamando o controller
const lojaController = require('../controllers/lojaController');

// Requisição usuário
router.get('/perfil-loja/:id', lojaController.show);
router.get('/editar-loja/:id', lojaController.edit);
router.put('/editar-loja/:id', lojaController.update);
router.get('/cadastrar-loja', lojaController.cadastro);
router.post('/cadastrar-loja', lojaController.cadastrar);
router.get('/dashboard/:id', lojaController.dashboard);

module.exports = router;