const carro = new Carrinho();
const carrinho = document.getElementById('carrinho'); // no navbar e view carrinho
const produtos = document.getElementById('lista-produtos'); // produtos da loja
const listaProdutos = document.querySelector('#lista-carrinho tbody'); // na navbar
const esvaziarCarrinhoBtn = document.getElementById('esvaziar-carrinho'); // botão de esvaziar carrinho - navbar
const verCarrinhoBtn = document.getElementById('ver-carrinho'); //botão ver carrinho - navbar

carregarEventos();

function carregarEventos() {
    // executado quando clica no botão comprar
    produtos.addEventListener('click', evt => carro.comprarProduto(evt));

    // quando remove produto do carrinho
    carrinho.addEventListener('click', evt => carro.removerProduto(evt));

    // esvaziar o carrinho
    esvaziarCarrinhoBtn.addEventListener('click', evt => carro.esvaziarCarrinho(evt));

    // Carregando documento mostra o que está armazenado no LS
    document.addEventListener('DOMContentLoaded', carro.mostrarProdutosLocalStorage());
    
    // Enviar pedido para outra pagina
    verCarrinhoBtn.addEventListener('click', evt => carro.processarPedido(evt));
}