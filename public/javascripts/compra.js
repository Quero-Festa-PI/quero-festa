const compra = new Carrinho ();
const listaCompra = document.querySelector('#lista-compra tbody');
// const carrinho = document.getElementById('carrinho');
// const verCarrinhoBtn = document.getElementById('');

carregarEventos();

function carregarEventos(){

    document.addEventListener('DOMContentLoaded', compra.mostrarProdutosLocalStorageCompra());
}