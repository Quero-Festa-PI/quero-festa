const {sequelize, Usuario} = require('../models');
const bcrypt = require('bcrypt');

module.exports = {    
   //Pagina Login
   login: (req, res, ) => {
        let err = 0;
        if (req.query.error == 1) {
             err = "Usuário e/ou senha incorreto(s)."
        };
        res.render('logar', { page: 'Login', err });
   },
   logar: async (req, res) => {

        let { email, senha } = req.body;

        email = email.toLowerCase();

        let usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
             res.redirect('/logar?error=1');
        }

        if (!bcrypt.compareSync(senha, usuario.senha)) {
             res.redirect('/logar?error=1');
        }

        req.session.usuario = usuario;
        return res.redirect('/');

   },
   cadastro: (req, res) => {
        let err = req.query.error
        if (err == 1) {
             err = "O e-mail informado já possui cadastro."
        }
        if (err == 2) {
             err = "Os e-mails informados não coincidem."
        }
        if (err == 3) {
             err = "Por favor, insira o seu nome completo."
        }
        res.render('cadastro', { page: 'cadastro', err });
   },
   cadastrar: async (req, res) => {
        let { nome, senha, email1, email2 } = req.body;

        // tratando string email
        email1 = email1.toLowerCase();
        email2 = email2.toLowerCase();

        // verificando existencia do email no banco
        let usuario = await Usuario.findOne({ where: { email: email1 } });
        if (!(usuario == null)) {
             return res.redirect('/cadastro?error=1');
        };

        // verificando correspondencia de emails
        if (!(email1 == email2)) {
             return res.redirect('cadastro?error=2');
        }

        let nomeCompleto = nome;

        // verificando se o usuario inseriu o nome completo
        if (nomeCompleto.split(" ").length <= 1) {
             return res.redirect('/cadastro?error=3');
        };

        function titleize(text) {
             var loweredText = text.toLowerCase();
             var words = loweredText.split(" ");
             for (var a = 0; a < words.length; a++) {
                  var w = words[a];

                  var firstLetter = w[0];
                  w = firstLetter.toUpperCase() + w.slice(1);

                  words[a] = w;
             }
             return words.join(" ");
        }

        // tratando string nome
        nomeCompleto = titleize(nomeCompleto);
        nome = nomeCompleto.split(" ")[0];
        let sobrenome = nomeCompleto.replace(nome + " ", "");

        // criptografando senha
        senha = bcrypt.hashSync(senha, 10);

        // criando usuario
        Usuario.create(
             {
                  nome,
                  sobrenome,
                  email: email1,
                  senha,
             }
        );

        // iniciando session e redirecionando para a home
        usuario = await Usuario.findOne({ where: { email: email1 } });
        req.session.usuario = usuario;
        return res.redirect('/');

   },
    // Perfil vendedor
    perfilVendedor: (req, res) => {
        res.render('perfil-vendedor', {page: 'perfil'});
    },
    // Perfil cliente
    perfilCliente: (req, res) => {
        res.render('perfil-cliente', {page: 'perfil'});
    },
    dashboard: (req, res, ) => {
     res.render('dashboard', { page: 'dashboard' });
}
}