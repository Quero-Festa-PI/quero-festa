
module.exports = {

   //Pagina inicial da loja 
    
   
   
    index: (req, res,) => {
         res.render('index', {page:'Home'});
    },
    //Pagina Login
    logar: (req, res,) => {
         res.render('logar', {page:'logar'});
    },
    cadastro: (req,res) => {
         res.render('cadastro', {page: 'cadastro'});
    },
    // Pagina painel do vendedor
    painelVendedor: (req, res, ) => {
         res.render('painel-vendedor', {page:'painel-vendedor'});
    },
    // Pagina cliente
    painelCliente: (req, res, ) => {
         res.render('painel-cliente', {page:'painel-cliente'});
    },
    //Pagina do cliente
    clienteCadastro: (req, res) => {
     res.render ('cliente-cadastro', {page:'cliente-cadastro'} );
    },
    // Pagina da loja
    loja:(req, res, ) => {
         res.render('perfil-loja', {page:'perfil-loja'});
    }

}