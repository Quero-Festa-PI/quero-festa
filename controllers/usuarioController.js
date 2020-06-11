const { sequelize, Usuario, Endereco, Loja } = require('../database/models');
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
               res.redirect('/usuarios/logar?error=1');
          }

          if (!bcrypt.compareSync(senha, usuario.senha)) {
               res.redirect('/usuarios/logar?error=1');
          }

          let loja = await Loja.findOne({ where: { usuarios_id: usuario.id } });

          req.session.usuario = usuario;

          if (loja) {
               req.session.loja = loja;
          }

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
               return res.redirect('/usuarios/cadastro?error=1');
          };

          // verificando correspondencia de emails
          if (!(email1 == email2)) {
               return res.redirect('/usuarios/cadastro?error=2');
          }

          let nomeCompleto = nome;

          // verificando se o usuario inseriu o nome completo
          if (nomeCompleto.split(" ").length <= 1) {
               return res.redirect('/usuarios/cadastro?error=3');
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
          usuario = await Usuario.create(
               {
                    nome,
                    sobrenome,
                    email: email1,
                    senha,
               }
          );

          // iniciando session e redirecionando para a home
          req.session.usuario = usuario;
          return res.redirect('/');

     },
     // Perfil cliente
     perfilCliente: async (req, res) => {

          let usuario = res.locals.usuario;

          if (!usuario) {
               return res.redirect('/usuarios/logar')
          }

          let endereco = await Endereco.findOne({ where: { usuarios_id: res.locals.usuario.id } });

          return res.render('perfil-cliente', { page: 'Perfil', endereco });
     },
     perfilClienteId: async (req, res) => {

          let usuario = res.locals.usuario;

          if (!usuario) {
               return res.redirect('/usuarios/logar')
          }

          // capturando id da rota
          let idUsuario = req.params.id;

          let usuarioPerfil = await Usuario.findByPk(idUsuario, { include: ['lojas', 'enderecos'] });
          let lojaPerfil = usuarioPerfil.lojas
          let endereco = usuarioPerfil.enderecos[0];

          res.render('perfil-cliente', { page: 'Perfil Cliente', usuarioPerfil, lojaPerfil, endereco })

     },
     alter: (req, res) => {
          res.render('editar-cliente', { page: 'Editar Dados' });
     },
     update: async (req, res) => {
          let { id } = req.params;
          let { nomeCli, dataCli, cpfCli } = req.body;
          let nomeCompleto = nomeCli;

          // Separar o nome  
          let nome = nomeCompleto.split(' ')[0];
          let sobrenome = nomeCompleto.replace(nome + " ", "");

          let userNovo = await Usuario.update({
               nome,
               sobrenome,
               data_nasc: dataCli,
               cpf: cpfCli
          }, {
               where: { id }
          })

          return res.redirect('/usuarios/perfil-cliente');
     },
     dashboard: (req, res, ) => {
          res.render('dashboard', { page: 'dashboard' });
     },
     sair: (req, res) => {
          req.session.destroy();
          res.redirect('/');
     }
}