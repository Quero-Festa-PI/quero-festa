// capturar produtos da localStorage
function getLocalStorage() {
    return JSON.parse(localStorage.getItem("@quero-festa:carrinho")) || [];
}

function redirecionarCarrinho() {
    window.location.href = "http://localhost:3000/pedidos/carrinho";
}

// cadastrar pedido do bd
const cadastrarPedido = () => {

    let produtos = getLocalStorage();

    let lojas = [];
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        if (lojas.indexOf(produto.loja_id) < 0) {
            lojas.push(produto.loja_id);
        }
    }

    // capturar forma de pagamento
    let pagamento;
    let boleto = document.getElementById("boleto");
    let debito = document.getElementById("debito");
    let credito = document.getElementById("credito");
    if (boleto.checked == true) {
        pagamento = 'Boleto';
    } else if (debito.checked == true) {
        pagamento = 'Débito';
    } else if (credito.checked == true) {
        pagamento = 'Crédito';
    } else {
        alert("Selecionar forma de pagamento!");
        return;
    }

    // capturar id do endereço
    let endereco = document.getElementById("id-endereco");
    let idEndereco = endereco.value;

    let pedido = { produtos, pagamento, idEndereco, lojas }

    fetch('http://localhost:3000/pedidos/cadastrar', {
        method: 'post',
        body: JSON.stringify(pedido),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (resposta) {
        return resposta.json();
    }).then(function (data) {
        localStorage.removeItem("@quero-festa:carrinho");
        window.location.href = `http://localhost:3000/pedidos/confirmacao?ids=${data}`;
    })

    return;

}

// renderizar
const renderizarCheckout = () => {
    let produtos = getLocalStorage();

    let spanValorTotal = document.querySelector(".dados-pagamento span");
    let valorTotal = 0;

    for (let produto of produtos) {
        produto.valor = produto.valor * produto.quantidade;
        valorTotal += produto.valor;
    }

    spanValorTotal.innerText = `R$${valorTotal.toFixed(2)}`;
}

renderizarCheckout();