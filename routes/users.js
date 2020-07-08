var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/perfil/');
    },
    filename: (req, file, cb) => {
        const {name, ext} = path.parse(file.originalname);
        cb(null, `${name}${ext}`)
    }
})
const upload = multer({storage});

// Chamando o controller
const usuarioController = require('../controllers/usuarioController');

// Requisição usuário
router.get('/logar', usuarioController.login);
router.post('/logar', usuarioController.logar);
router.get('/cadastro', usuarioController.cadastro);
router.post('/cadastro', usuarioController.cadastrar);
router.get('/perfil-cliente/:id', usuarioController.perfilClienteId);
router.get('/editar-cliente/:id', usuarioController.alter);
router.put('/editar-cliente/:id', upload.single('img'), usuarioController.update);
router.get('/sair', usuarioController.sair);
router.post('/consultar-cep', usuarioController.consultaCep);
router.get('/editar-endereco', usuarioController.endereco);
router.post('/editar-endereco', usuarioController.cadastrarEndereco);
router.put('/editar-endereco/:id', usuarioController.editarEndereco);


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
