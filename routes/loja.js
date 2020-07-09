var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/loja/');
    },
    filename: (req, file, cb) => {
        const { name, ext } = path.parse(file.originalname);
        cb(null, `${name}${ext}`)
    }
})
const upload = multer({ storage });

// Chamando o controller
const lojaController = require('../controllers/lojaController');

// Requisição usuário
router.get('/perfil-loja/:id', lojaController.show);
router.get('/editar-loja/:id', lojaController.edit);
router.put('/editar-loja/:id', upload.single('file'), lojaController.update);
router.get('/cadastrar-loja', lojaController.cadastro);
router.post('/cadastrar-loja', upload.single('file'), lojaController.cadastrar);
router.get('/dashboard', lojaController.dashboard);
router.post('/dashboardGrafico/:grafico', lojaController.dashboardGrafico);
router.delete('/deletar/:id', lojaController.deletar);

module.exports = router;