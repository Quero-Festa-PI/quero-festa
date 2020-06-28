// capturar produtos da localStorage
function getLocalStorage() {
    return JSON.parse(localStorage.getItem("@quero-festa:carrinho")) || [];
}

function setLocalStorage(produtos) {
    localStorage.setItem("@quero-festa:carrinho", JSON.stringify(produtos));
    renderizar();
}

// adicionar produto à localStorage
const adicionarProduto = (id, nome, valor, imagem, quantidade) => {

    let produtos = getLocalStorage();

    let indice = produtos.findIndex(produto => produto.id == id);

    if (indice >= 0) {
        produtos[indice].quantidade += quantidade;
    } else {
        produtos.push({ id, nome, valor, imagem, quantidade });
    }

    setLocalStorage(produtos);
}

// remover produto da localStorage
const deletarProduto = id => {

    let produtos = getLocalStorage();

    let indice = produtos.findIndex(produto => produto.id == id);

    if (indice >= 0) {
        produtos.splice(indice, 1);
    } else {
        alert("Produto não encontrado")
    }

    setLocalStorage(produtos);
}

// alterar a quantidade do produto na localStorage
const alterarQuantidade = (id, quantidade) => {

    quantidade = Number(quantidade);

    let produtos = getLocalStorage();

    let indice = produtos.findIndex(produto => produto.id == id);

    if (indice >= 0) {
        produtos[indice].quantidade = quantidade;
    } else {
        alert("Produto não encontrado")
    }

    setLocalStorage(produtos);
}

const adicionarListeners = () => {
    const aEsvaziarCarrinho = document.getElementById('esvaziar-carrinho');
    aEsvaziarCarrinho.addEventListener('click', (e) => {
        e.preventDefault;
        localStorage.removeItem("@quero-festa:carrinho");
        renderizar();
    });
}

// renderizar produtos no front-end
const renderizar = () => {

    let produtos = getLocalStorage();

    let divCarrinho = document.getElementById("lista-carrinho");
    let bodyCarrinho = divCarrinho.children[1];
    bodyCarrinho.innerHTML = "";

    for (let produto of produtos) {

        // multiplicando o valor do produto
        produto.valor = produto.valor * produto.quantidade;

        // criar linha de tabela
        let div = document.createElement("div");
        div.setAttribute("class", "carrinho-produto")

        div.innerHTML = `
        <div class="carrinho-imagem">
            <img src="${produto.imagem}">
        </div>
        <div class="nome-quantidade">
            <div class="carrinho-nome">${produto.nome}</div>
            <div class="carrinho-quantidade">Quantidade: ${produto.quantidade}</div>
        </div>
        <div class="carrinho-valor">R$${produto.valor.toFixed(2)}</div>
        <div class="carrinho-deletar">
            <button value="${produto.id}" onclick="deletarProduto(${produto.id})">X</button>
        </div>
        `

        bodyCarrinho.appendChild(div);

    }
}

adicionarListeners();
renderizar();