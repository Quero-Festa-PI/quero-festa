// Essas duas linhas podem ser resumidas em
// const router = require('express).Router();
var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/produtos/');
    },
    filename: (req, file, cb) => {
        const {name, ext} = path.parse(file.originalname);
        cb(null, `${name}${ext}`)
    }
})
const upload = multer({storage});

// Chamando o controller
const produtoController = require('../controllers/produtoController');

// Requisições produto
router.get('/buscar', produtoController.buscar);
router.get('/cadastrar-produto', produtoController.cadastrar);
router.post('/cadastrar-produto', upload.array('file', 5), produtoController.cadastro);

router.get('/:id', produtoController.show);

module.exports = router;
