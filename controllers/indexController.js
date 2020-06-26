const bcrypt = require('bcrypt');

module.exports = {

    index: (req, res) => {
        return res.render('index', { page: 'Home' });
    },
    alterarNavegacao: (req, res) => {
        req.session.navegacaoLoja = !req.session.navegacaoLoja;

        res.redirect(req.headers.referer.replace('http://localhost:3000', ""))
    }

}