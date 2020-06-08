const { sequelize, Usuario, Endereco } = require('../database/models');
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
          res.render('perfil-vendedor', { page: 'perfil' });
     },
     // Perfil cliente
     perfilCliente: async (req, res) => {
          console.log(res.usuario);
          usuario = res.usuario;

          // Fazer a consulta
          let endereco = await Endereco.findOne({ where: { id: usuario.id } });
          console.log(endereco);

          res.render('perfil-cliente', { page: 'Perfil', usuario, endereco });
     },
     alter: (req, res) => {
          console.log(res.usuario);
          usuario = res.usuario;



          res.render('editar-cliente', { page: 'Editar Dados', usuario });
     },
     update: async (req, res) => {
          let { id } = req.params;
          let { nomeCli, dataCli, cpfCli } = req.body;

          // Separar o nome    

          let userNovo = await Usuario.update({
               nome: nomeCli,
               data_nasc: dataCli,
               cpf: cpfCli
          }, {
               where: { id }
          })

          console.log(userNovo);
          return res.redirect('/usuarios/perfil-cliente');

     },


     //     update: (req, res) => {
     //      console.log(res.usuario);
     //      usuario = res.usuario; 

     //      // Capturar novos dados
     //      let {id, nome, data, cpf } = req.body;      

     //      // Alterar dados
     //      Usuario.findOne({where: {id: req.body.id}})
     //      console.log(id);
     //      res.render('perfil-cliente', { page: 'Perfil', usuario });       
     //      //  .then(user => {
     //      //      let alterarUser = 
     //           Usuario.update(
     //                {
     //                     nome,
     //                     data_nasc: data,
     //                     cpf
     //                } 


     //      //  }).catch(err => {
     //      //       req.flash('error_msg', 'Houve um erro');
     //      //       res.redirect('/usuarios/perfil-cliente');
     //      //  })


     //           )},
     dashboard: (req, res, ) => {
          res.render('dashboard', { page: 'dashboard' });
     },
     sair: (req, res) => {
          req.session.destroy();
          res.redirect('/');
     }
}