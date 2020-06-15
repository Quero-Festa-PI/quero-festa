class Carrinho {

    // Adicionar produto no carrinho
    comprarProduto(evt){
        evt.preventDefault();
        
        // Verifica se existe a classe adicionar-carrinho
        if(evt.target.classList.contains('adicionar-carrinho')){
            // pegando todos os elementos
            const produto = evt.target.parentElement.parentElement.parentElement.parentElement;
            // Dados selecionados            
            this.lerDadosProduto(produto); 
            // console.log(produto); 
        }
    }
    
    // Ler dados do produto
    lerDadosProduto(produto){
        const infoProduto = {
            img: produto.querySelector('img').src,
            nome: produto.querySelector('titulo').textContent,
            preco: produto.querySelector('preco').textContent,
            descricao: produto.querySelector('info').textContent,
            id: produto.querySelector('button').getAttribute('data-id'),
            qtde: 1
        }
        this.inserirCarrinho(infoProduto);
    }    

    // Inserir produto no carrinho
    inserirCarrinho(produto){
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>
            <img src="${produto.img}" width=100>
        </td>
        <td>${produto.nome}</td>
        <td>${produto.preco}</td>
        <td>
            <a href="#" class="remove" data-id="${produto.id}">x</a>
        </td>`;           
        listaProdutos.appendChild(tr);
        // this.guardarProdutoLocalStorage(produto);
        console.log(produto);
    }
        
    // Remover produto do carrinho
    removerProduto(evt){
        evt.preventDefault();
    
        let produto, produtoId;
    
        if(evt.target.classList.contains('remove')){
            evt.target.parentElement.parentElement.remove();
            produto = evt.target.parentElement.parentElement;
            produtoId = produto.querySelector('a').getAttribute('data-id');
        }
    }
    
    // Esvaziar carrinho
    esvaziarCarrinho(evt){
        evt.preventDefault();
        while(listaProdutos.firstChild){
            listaProdutos.removeChild(listaProdutos.firstChild);
        }
        return false;
    }
    
    // Armazenar no Local Storage
    
    // Verifique se existem elementos no LS
    
    // Mostrar os produtos salvos no LS

}




