// capturar produtos da localStorage
function getLocalStorage() {
    return JSON.parse(localStorage.getItem("@quero-festa:carrinho")) || [];
}

function setLocalStorage(produtos) {
    produtos = JSON.stringify(produtos);
    localStorage.removeItem("@quero-festa:carrinho");
    localStorage.setItem("@quero-festa:carrinho", produtos);
    renderizar();
}

// adicionar produto à localStorage
const adicionarProduto = (id, nome, valor, imagem, quantidade, loja, loja_id, redirecionar) => {

    let produtos = getLocalStorage();

    let indice = produtos.findIndex(produto => produto.id == id);

    if (indice >= 0) {
        produtos[indice].quantidade += quantidade;
        alert(`Adicionado mais um produto ao carrinho! Total: ${produtos[indice].quantidade}`);
    } else {
        console.log({ id, nome, valor, imagem, quantidade, loja, loja_id });
        produtos.push({ id, nome, valor, imagem, quantidade, loja, loja_id });
        alert("Produto adicionado ao carrinho!");
    }

    setLocalStorage(produtos);

    if (redirecionar == 1) {
        window.location.href = "http://localhost:3000/pedidos/carrinho";
    }
}

const adicionarProdutoFetch = (id, quantidade, redirecionar) => {

    let produtos = getLocalStorage();

    let indice = produtos.findIndex(produto => produto.id == id);

    if (indice >= 0) {
        produtos[indice].quantidade += quantidade;
        setLocalStorage(produtos);
        alert(`Adicionado mais um produto ao carrinho! Total: ${produtos[indice].quantidade}`);
    } else {
        // realizar consulta fetch
        fetch(`http://localhost:3000/produtos/fetch-carrinho/${id}`, {
            method: 'post',
        })
            .then((resposta) => {
                resposta = resposta.json();
                return resposta;
            })
            .then((dado) => {
                const { lojas, produto, imagem } = dado;
                const { nome, valor } = produto;
                const { image_url } = imagem;
                const nomeLoja = lojas.nome;
                const idLoja = lojas.id;
                produtos.push({ id, nome, valor, imagem: image_url, quantidade, loja: nomeLoja, loja_id: idLoja });
                setLocalStorage(produtos);
                if (document.title == "Quero Festas | Carrinho") {
                    compreTambem();
                }
            })
    }


    if (redirecionar == 1) {
        window.location.href = "http://localhost:3000/pedidos/carrinho";
    }

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

    localStorage.setItem("@quero-festa:carrinho", JSON.stringify(produtos));

    let remover = document.querySelector(`.produto-${id}`);
    remover.remove();
    remover = document.querySelector(`.navbar-produto-${id}`);
    remover.remove();

    alterarValorTotal();

}

// alterar a quantidade do produto na localStorage
const alterarQuantidade = (id, quantidade) => {

    let input = document.querySelector(`.input-quantidade .input-${id}`);

    if (!(quantidade == -1 && input.value == 1)) {

        quantidade = Number(quantidade);

        let produtos = getLocalStorage();

        let indice = produtos.findIndex(produto => produto.id == id);

        if (indice >= 0) {
            produtos[indice].quantidade += quantidade;
        } else {
            alert("Produto não encontrado")
        }

        let novoValor = produtos[indice].quantidade * produtos[indice].valor

        localStorage.setItem("@quero-festa:carrinho", JSON.stringify(produtos));

        input.value = produtos[indice].quantidade;
        let divQuantidade = document.querySelector(`div.navbar-produto-${id} .carrinho-quantidade`);
        divQuantidade.innerText = `Quantidade: ${produtos[indice].quantidade}`;

        let span = document.querySelector(`.produto-valor .span-${id}`);
        span.innerText = `R$${novoValor.toFixed(2)}`
        let div = document.querySelector(`div.navbar-produto-${id} .carrinho-valor`);
        div.innerText = `R$${novoValor.toFixed(2)}`

        alterarValorTotal();
    }

}

const definirQuantidade = (id, quantidade) => {

    quantidade = Number(quantidade);

    if (quantidade >= 1) {

        let produtos = getLocalStorage();

        let indice = produtos.findIndex(produto => produto.id == id);

        if (indice >= 0) {
            produtos[indice].quantidade = quantidade;
        } else {
            alert("Produto não encontrado")
        }

        let novoValor = produtos[indice].quantidade * produtos[indice].valor

        localStorage.setItem("@quero-festa:carrinho", JSON.stringify(produtos));

        let input = document.querySelector(`.input-quantidade .input-${id}`);
        input.value = produtos[indice].quantidade;
        let divQuantidade = document.querySelector(`div.navbar-produto-${id} .carrinho-quantidade`);
        divQuantidade.innerText = `Quantidade: ${produtos[indice].quantidade}`;

        let span = document.querySelector(`.produto-valor .span-${id}`);
        span.innerText = `R$${novoValor.toFixed(2)}`
        let div = document.querySelector(`div.navbar-produto-${id} .carrinho-valor`);
        div.innerText = `R$${novoValor.toFixed(2)}`

        alterarValorTotal();

    } else {

        let produtos = getLocalStorage();

        let indice = produtos.findIndex(produto => produto.id == id);

        let input = document.querySelector(`.input-quantidade .input-${id}`);
        input.value = 1;

        let span = document.querySelector(`.produto-valor .span-${id}`);
        span.innerText = `R$${produtos[indice].valor.toFixed(2)}`

        localStorage.setItem("@quero-festa:carrinho", JSON.stringify(produtos));

        alterarValorTotal();

    }

}

const alterarValorTotal = () => {

    let produtos = getLocalStorage();
    let total = 0;

    for (produto of produtos) {
        total += produto.quantidade * produto.valor;
    }

    let valorTotal = document.querySelector(".fechamento span");
    valorTotal.innerText = `R$${total.toFixed(2)}`

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
    if (document.title == "Quero Festas | Carrinho") {
        var carrinhoPage = document.querySelector("div.page-carrinho-produtos");
        carrinhoPage.innerHTML = "";
    }

    for (let produto of produtos) {

        // multiplicando o valor do produto
        produto.valor = produto.valor * produto.quantidade;

        let div = document.createElement("div");
        div.setAttribute("class", `carrinho-produto navbar-produto-${produto.id}`)

        div.innerHTML = `
        <div class="carrinho-imagem">
            <img src="${produto.imagem}">
        </div>
        <div class="nome-quantidade">
            <a href="/produtos/${produto.id}" class="carrinho-nome">${produto.nome}</a>
            <div class="carrinho-quantidade">Quantidade: ${produto.quantidade}</div>
        </div>
        <div class="carrinho-valor">R$${produto.valor.toFixed(2)}</div>
        <div class="carrinho-deletar">
            <button value="${produto.id}" onclick="deletarProduto(${produto.id})">X</button>
        </div>
        `

        bodyCarrinho.appendChild(div);

        if (document.title == "Quero Festas | Carrinho") {
            let divPage = document.createElement("div");
            divPage.setAttribute("class", `carrinho-produto produto-${produto.id}`)

            divPage.innerHTML = `
            <div class="produto-imagem">
                <img src="${produto.imagem}">
            </div>
            <div class="infos-produto">
                <div class="nome-loja">
                    <a href="/produtos/${produto.id}" class="produto-nome">${produto.nome}</a>
                    <span class="produto-loja">Vendido por: ${produto.loja}</span>
                </div>
                <div class="preco-quantidade">
                    <div class="produto-quantidade">
                        <div class="input-quantidade">
                            <input onchange="definirQuantidade(${produto.id}, this.value)" class="input-${produto.id}" type="text" value="${produto.quantidade}" />
                            <div class="buttons">
                                <button onclick="alterarQuantidade(${produto.id}, 1)">+</button>
                                <button onclick="alterarQuantidade(${produto.id}, -1)">-</button>
                            </div>
                        </div>
                    </div>
                    <div class="produto-valor"><span class="span-${produto.id}">R$${produto.valor.toFixed(2)}</span></div>
                    <div class="produto-deletar">
                        <button value="${produto.id}" onclick="deletarProduto(${produto.id})">X</button>
                    </div>
                </div>
            </div>
            `

            carrinhoPage.appendChild(divPage);
        }
    }

    if (document.title == "Quero Festas | Carrinho") {
        alterarValorTotal();
    }
}

const compreTambem = () => {

    if (document.title == "Quero Festas | Carrinho") {

        let produtos = getLocalStorage();

        if (produtos == []) {
            return;
        }

        let ids = produtos.map(produto => produto.id);
        let idLoja = produtos[0].loja_id;

        var row = document.querySelector('div.compre-tambem');
        row = row.querySelector('div.produtos');

        row.innerHTML = '';

        fetch(`http://localhost:3000/pedidos/compre-tambem?ids=${ids}&idLoja=${idLoja}`, {
            method: 'post',
        })
            .then((resposta) => {
                resposta = resposta.json();
                return resposta;
            })
            .then((dado) => {
                dado.forEach((produto) => {

                    let avaliacao = 0;
                    let avaliacaoPerc = 100;
                    let quantidadeAvaliacoes = 0;
                    if (produto.avaliacoes) {
                        avaliacao = produto.avaliacoes.media;
                        avaliacaoPerc = ((18 * avaliacao) + (4.3875 * Math.trunc(avaliacao))) / 107.550 * 100;
                        quantidadeAvaliacoes = produto.avaliacoes.quantidadeAvaliacoes;
                    }
                    let cardProduto = document.createElement("card");
                    cardProduto.setAttribute("class", "anuncio-box card shadow card-produtos");

                    cardProduto.innerHTML = `
                        <div class="imagem-produto">
                          <button onclick="adicionarProdutoFetch(${produto.id},1,0)">Adicionar ao carrinho</button>
                          <img src="${produto.imagem}" class="img-fluid">
                        </div>
                        <titulo class="card-text">${produto.nome}</titulo>
                        <div class="avaliacao">
                          <div class="stars-outer">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <div class="stars-inner" style="width: ${avaliacaoPerc}%">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                            </div>
                          </div>
                          <span>${avaliacao}</span>
                          <span>(${quantidadeAvaliacoes})</span>
                        </div>
                        <preco>R$${produto.valor.toFixed(2)}</preco>
                        <a href="/produtos/${produto.id}">Saiba Mais...</a>`
                    row.appendChild(cardProduto);
                })
            })
    }

}

const navegarCheckout = () => {
    window.location.href = "http://localhost:3000/pedidos/checkout";
}

adicionarListeners();
renderizar();
compreTambem();