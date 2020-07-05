const { sequelize, Sequelize, Usuario, Endereco, Pagamento, PedidoProduto, Entrega, Loja, Produto, Pedido } = require('../database/models');
const bcrypt = require('bcrypt');
const apiCep = require('awesome-cep');

module.exports = {
     //Pagina Login
     login: (req, res,) => {
          let err = 0;
          let link = req.session.urlPosLogin;
          if (req.query.error == 1) {
               err = "Usuário e/ou senha incorreto(s)."
          };
          res.render('logar', { page: 'Logar', err, link });
     },
     logar: async (req, res) => {

          let { email, senha, url } = req.body;

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

          return url ? res.redirect(url) : res.redirect('/');
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
          res.render('cadastro', { page: 'Cadastrar', err });
     },
     cadastrar: async (req, res) => {
          let { nome, senha, email1, email2 } = req.body;

          email1 = email1.toLowerCase();
          email2 = email2.toLowerCase();

          let usuario = await Usuario.findOne({ where: { email: email1 } });
          if (!(usuario == null)) {
               return res.redirect('/usuarios/cadastro?error=1');
          };

          if (!(email1 == email2)) {
               return res.redirect('/usuarios/cadastro?error=2');
          }

          let nomeCompleto = nome;

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

          nomeCompleto = titleize(nomeCompleto);
          nome = nomeCompleto.split(" ")[0];
          let sobrenome = nomeCompleto.replace(nome + " ", "");

          senha = bcrypt.hashSync(senha, 10);

          usuario = await Usuario.create(
               {
                    nome,
                    sobrenome,
                    email: email1,
                    senha,
               }
          );

          req.session.usuario = usuario;
          return res.redirect('/');

     },
     perfilClienteId: async (req, res) => {

          let usuario = res.locals.usuario;

          if (!usuario) {
               req.session.urlPosLogin = req.originalUrl;
               return res.redirect('/usuarios/logar')
          }

          let idUsuario = req.params.id;

          let usuarioPerfil = await Usuario.findByPk(idUsuario, { include: ['lojas', 'enderecos'] });
          let lojaPerfil = usuarioPerfil.lojas;
          let endereco;
          usuario.id == usuarioPerfil.id ? endereco = usuarioPerfil.enderecos[0] : ''

          res.render('perfil-cliente', { page: 'Perfil Cliente', usuarioPerfil, lojaPerfil, endereco })

     },
     alter: async (req, res) => {

          const { id } = req.params;

          var usuarioLogado = res.locals.usuario

          if (!usuarioLogado) {
               req.session.urlPosLogin = req.originalUrl;
               res.redirect('/usuarios/logar');
          }
          if (usuarioLogado.id != id) {
               return res.redirect(`/usuarios/editar-cliente/${usuarioLogado.id}`);
          }

          usuarioLogado = await Usuario.findByPk(id, { include: ['enderecos'] });
          usuarioLogado = usuarioLogado.toJSON();
          let endereco;
          usuarioLogado.enderecos ? endereco = usuarioLogado.enderecos[0] : ''

          let err = req.query.error;

          if (err == 1) {
               err = 'Senha inválida';
          }
          if (err == 2) {
               err = 'Senhas não conferem';
          }

          return res.render('editar-cliente', { page: 'Editar Dados', usuarioLogado, endereco, err });
     },
     update: async (req, res) => {
          // Dados do usuario
          let { id } = req.params;
          let { nomeCli, dataCli, cpfCli, celular } = req.body;
          let nomeCompleto = nomeCli;
          let usuario = res.locals.usuario;

          // Dados do endereço
          let { enderecoId, cep, rua, numeral, complemento, cidade, estado } = req.body;

          // senha
          let { senhaAtual, novaSenha, confirmarSenha } = req.body;

          // Separar o nome  
          let nome = nomeCompleto.split(' ')[0];
          let sobrenome = nomeCompleto.replace(nome + " ", "");

          if (!senhaAtual) {
               senhaAtual = usuario.senha;
               novaSenha = usuario.senha;
               confirmarSenha = usuario.senha;
          }

          if (!bcrypt.compareSync(senhaAtual, usuario.senha)) {
               res.redirect('/usuarios/editar-cliente/usuario.id?error=1');
          }
          // verificando senhas novas
          if (novaSenha != confirmarSenha) {
               res.redirect('/usuarios/editar-cliente/usuario.id?error=2');
          }

          // criptografando nova senha
          novaSenha = bcrypt.hashSync(novaSenha, 10);

          let userNovo = await Usuario.update({
               nome,
               sobrenome,
               data_nasc: dataCli,
               cpf: cpfCli,
               celular,
               senha: novaSenha
          },
               { where: { id } });

          let endereco = await Endereco.update({
               estado,
               cidade,
               cep,
               logradouro: rua,
               numeral,
               complemento,
               usuarios_id: userNovo.id
          }, {
               where: {
                    id: enderecoId,
                    usuarios_id: id
               }
          });
          return res.redirect(`/usuarios/perfil-cliente/${res.locals.usuario.id}`);
     },
     sair: (req, res) => {
          req.session.destroy();
          res.redirect('/');
     },
     endereco: async (req, res) => {
          let usuario = res.locals.usuario;
          if (!usuario) {
               req.session.urlPosLogin = req.originalUrl;
               res.redirect('/usuarios/logar');
          }
          let endereco = await Endereco.findOne({ where: { usuarios_id: usuario.id } });
          res.render('editar-endereco', { page: 'Editar Endereço', endereco, usuario });
     },
     consultaCep: async (req, res) => {
          var { cep } = req.body;
          cep = cep.replace("-", "")
          const retorno = await apiCep.findCEP(req.body.cep)
               .then(resp => resp)
               .catch(error => error);
          res.send(retorno);
     },
     cadastrarEndereco: async (req, res) => {
          let { usuarioId, cep, rua, numeral, complemento, cidade, estado } = req.body;

          if (!estado) {
               console.log(estado);
               return res.send('Estado não pode ser nulo');
          }

          cep = cep.replace("-", "");
          const retornoConsultaCep = await apiCep.findCEP(req.body.cep)
               .then(resp => resp)
               .catch(error => error);
          if (retornoConsultaCep.message) {
               res.send(retornoConsultaCep.message);
          }

          if (!Number(numeral)) {
               console.log(numeral);
               return res.send('número não é numérico');
          }

          let endereco = Endereco.create({
               estado,
               cidade,
               cep,
               logradouro: rua,
               numeral,
               complemento,
               usuarios_id: usuarioId,
          })

          if (endereco) {
               return res.redirect('/usuarios/editar-endereco');
          } else {
               return res.send("Erro na criação do banco")
          }

     },
     editarEndereco: async (req, res) => {

          let { enderecoId, cep, rua, numeral, complemento, cidade, estado } = req.body;

          if (!estado) {
               console.log(estado);
               return res.send('Estado não pode ser nulo');
          }

          cep = cep.replace("-", "");
          const retornoConsultaCep = await apiCep.findCEP(req.body.cep)
               .then(resp => resp)
               .catch(error => error);
          if (retornoConsultaCep.message) {
               res.send(retornoConsultaCep.message);
          }

          if (!Number(numeral)) {
               console.log(numeral);
               return res.send('número não é numérico');
          }

          let endereco = await Endereco.update({
               estado,
               cidade,
               cep,
               logradouro: rua,
               numeral,
               complemento,
          }, {
               where: {
                    id: enderecoId
               }
          });

          return res.redirect('/usuarios/editar-endereco');
     }
}