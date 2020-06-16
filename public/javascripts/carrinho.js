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

        let produtosLS = this.produtoLocalStorange();
        produtosLS.forEach(function(produtoLS){
            if(produtoLS.id === infoProduto.id){
                produtosLS = produtoLS.id;
            }
        });

        if(produtosLS === infoProduto.id){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'O produto já foi selecionado',
                showConfirmButton: false,
                timer: 1000
            })
        } else {
            this.inserirCarrinho(infoProduto);
        }
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
        this.guardarProdutoLocalStorage(produto);
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
        this.removerProdutoLocalStorage(produtoId);
    }
    
    // Esvaziar carrinho
    esvaziarCarrinho(evt){
        evt.preventDefault();
        while(listaProdutos.firstChild){
            listaProdutos.removeChild(listaProdutos.firstChild);
        }
        this.esvaziarLocalStorange();
        return false;
    }
    
    // Armazenar no Local Storage
    guardarProdutoLocalStorage(produto){
        // Obter valor de uma matriz com dados LS
        let produtos = this.produtoLocalStorange();
        
        // Adicione o produto ao carrinho
        produtos.push(produto);
    
        // Adicionamos no LS
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }
    
    // Verifica se existem elementos no LS
    produtoLocalStorange(){
        let produtoLS;
    
        // Verifique se há algo no LS
        if(localStorage.getItem('produtos') === null){
            produtoLS = [];
        } else {
            produtoLS = JSON.parse(localStorage.getItem('produtos'));
        }
        return produtoLS;
    }

    // Excluir produto do LS
    removerProdutoLocalStorage(produtoId){
        let produtosLS = this.produtoLocalStorange();

        // Compara o id do produto excluido com o do LS
        produtosLS.forEach(function(produtoLS, index){
            if(produtoLS.id === produtoId){
                produtosLS.splice(index, 1);
            }
        });
        localStorage.setItem('produtos', JSON.stringify(produtosLS));
    }
    
    // Mostrar os produtos salvos no LS
    mostrarProdutosLocalStorage(){
        let produtosLS = this.produtoLocalStorange();

        // Modelo
        produtosLS.forEach(function(produto){
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
        })
    }

    // Exclui todos os dados LS
    esvaziarLocalStorange(){
        localStorage.clear();
    }

    // Processar pedido - ir pala tela de carrinho
    processarPedido(evt){
        evt.preventDefault();

        if(this.produtoLocalStorange().length === 0){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'O carrinho está vazio, adicione um produto',
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            location.href = 'http://localhost:3000/pedidos/carrinho';
        }
    }

}




