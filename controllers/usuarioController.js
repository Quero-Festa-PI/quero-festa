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
          let {nome, senha, email1, email2 } = req.body;
          let endereco;

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
          endereco = await Endereco.create({
               estado: 'SP',
               cidade: 'Cidade',
               cep: '00000000',
               logradouro: 'Rua, Avenida, Estrada',
               numeral: 1,
               complemento: ' ',
               usuarios_id: res.locals.usuario.id  
          })

          // iniciando session e redirecionando para a home
          req.session.usuario = usuario;
          return res.redirect('/');

     },
     perfilClienteId: async (req, res) => {

          let usuario = res.locals.usuario;

          if (!usuario) {
               return res.redirect('/usuarios/logar')
          }

          // capturando id da rota
          let idUsuario = req.params.id;

          let usuarioPerfil = await Usuario.findByPk(idUsuario, { include: ['lojas', 'enderecos']});
          let lojaPerfil = usuarioPerfil.lojas;
          let endereco = usuarioPerfil.enderecos[0];         

          res.render('perfil-cliente', { page: 'Perfil Cliente', usuarioPerfil, lojaPerfil, endereco })

     },
     alter: async (req, res) => {   
          let usuario = res.locals.usuario;  
          let endereco = await Endereco.findOne({ where: { usuarios_id: res.locals.usuario.id } });      
          let err = req.query.error;

          if(err == 1){
               err = 'Senha inválida';
          }
          if(err == 2){
               err = 'Senhas não conferem';
          }

          return res.render('editar-cliente', { page: 'Editar Dados', usuario, endereco, err });
     },
     update: async (req, res) => {
          // Dados do usuario
          let { id } = req.params;
          let { nomeCli, dataCli, cpfCli } = req.body;
          let nomeCompleto = nomeCli;
          let usuario = res.locals.usuario;
          
          // Dados do endereço
          let {enderecoId, cep, rua, numeral, complemento, cidade, estado} = req.body;  

          // senha
          let {senhaAtual, novaSenha, confirmarSenha} = req.body;
            
          // Separar o nome  
          let nome = nomeCompleto.split(' ')[0];
          let sobrenome = nomeCompleto.replace(nome + " ", "");

          if(senhaAtual == null){
               senhaAtual = usuario.senha;
               novaSenha = usuario.senha;
               confirmarSenha = usuario.senha;
          }

          // verificando senha atual
          if(!bcrypt.compareSync(senhaAtual, usuario.senha)) {
               res.redirect('/usuarios/editar-cliente/usuario.id?error=1');
          }
          // verificando senhas novas
          if(novaSenha != confirmarSenha){
               res.redirect('/usuarios/editar-cliente/usuario.id?error=2');
          }

          // criptografando nova senha
          novaSenha = bcrypt.hashSync(novaSenha, 10);

          let userNovo = await Usuario.update({
               nome,
               sobrenome,
               data_nasc: dataCli,
               cpf: cpfCli,
               senha: novaSenha
          }, 
          { where: {id} });

          let endereco = await Endereco.update({
               estado,
               cidade,
               cep,
               logradouro: rua,
               numeral,
               complemento,
               usuarios_id: userNovo.id
          },{
               where: { 
                    id: enderecoId,
                    usuarios_id: id
               }
          });
          

          return res.redirect(`/usuarios/perfil-cliente/${res.locals.usuario.id}`);
     },
     dashboard: (req, res, ) => {
          res.render('dashboard', { page: 'dashboard' });
     },
     sair: (req, res) => {
          req.session.destroy();
          res.redirect('/');
     }
}