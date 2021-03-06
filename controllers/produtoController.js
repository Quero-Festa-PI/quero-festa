const { sequelize, Sequelize, Produto, AvaliacoesDeProdutos, Usuario, Loja, PedidoProduto, Categoria, ImagensDeProduto } = require('../database/models')
const Op = Sequelize.Op;

module.exports = {
    buscar: async (req, res) => {

        // armazenar parametros da pesquisa
        let search = req.query.search;
        let pageActual = req.query.page;

        // pagina e limite padrões
        if (!pageActual) { pageActual = 1; }
        let limitProducts = 12;

        // buscar produtos no banco de dados
        let allProducts = await Produto.findAll({
            where: { nome: { [Op.like]: '%' + search + '%' } },
            include: [{
                model: AvaliacoesDeProdutos,
                as: 'avaliacoes',
                attributes: [
                    [sequelize.fn('avg', sequelize.col('classificacao')), 'media'],
                    [sequelize.fn('count', sequelize.col('classificacao')), 'quantidade']
                ],
            }, {
                model: ImagensDeProduto,
                as: 'imagens',
                attributes: ['image_url'],
                limit: 1,
            }],
            group: ['avaliacoes.produtos_id'],
            attributes: ['id', 'nome', 'valor'],
        });

        let totalPage = Math.ceil(allProducts.length / limitProducts);

        // fazer paginação dos produtos encontrados
        function listProducts(allProducts, pageActual, limitProducts) {
            let result = [];
            let count = (pageActual * limitProducts) - limitProducts;
            let delimiter = count + limitProducts;

            if (pageActual <= totalPage) {
                for (let i = count; i < delimiter; i++) {
                    if (allProducts[i]) {
                        result.push(allProducts[i]);
                    }
                }
            } else {
                res.redirect('/produtos/buscar?search=' + search + '&page=' + totalPage);
            }

            return result;
        };

        const resultado = listProducts(allProducts, pageActual, limitProducts);
        const quantidade = allProducts.length;

        res.render('buscar', { page: 'Resultado da Busca', resultado, search, quantidade, totalPage, pageActual });
    },
    categorias: async (req, res) => {
        let { categoria } = req.query;
        let pageActual = req.query.page;

        // pagina e limite padrões
        if (!pageActual) { pageActual = 1; }
        let limitProducts = 12;

        let allProducts = await Produto.findAll({
            include: [{
                model: AvaliacoesDeProdutos,
                as: 'avaliacoes',
                attributes: [
                    [sequelize.fn('avg', sequelize.col('classificacao')), 'media'],
                    [sequelize.fn('count', sequelize.col('classificacao')), 'quantidade']
                ],
            }, {
                model: ImagensDeProduto,
                as: 'imagens',
                attributes: ['image_url'],
                limit: 1,
            }, {
                model: Categoria,
                as: 'categorias',
                attributes: ['id', 'nome'],
            }],
            group: ['avaliacoes.produtos_id'],
            attributes: ['id', 'nome', 'valor'],
            where: Sequelize.literal('`categorias`.`id` = ' + categoria),
        });

        let totalPage = Math.ceil(allProducts.length / limitProducts);

        // fazer paginação dos produtos encontrados
        function listProducts(allProducts, pageActual, limitProducts) {
            let result = [];
            let count = (pageActual * limitProducts) - limitProducts;
            let delimiter = count + limitProducts;

            if (pageActual <= totalPage) {
                for (let i = count; i < delimiter; i++) {
                    if (allProducts[i]) {
                        result.push(allProducts[i]);
                    }
                }
            } else {
                res.redirect('/produtos/categorias?categoria=' + categoria + '&page=' + totalPage);
            }

            return result;
        };

        var resultado = listProducts(allProducts, pageActual, limitProducts);
        resultado = resultado.map(produto => {
            produto = produto.toJSON();
            produto.categoria = produto.categorias[0].nome;
            produto.categoriaId = produto.categorias[0].id;
            produto.imagem = produto.imagens[0].image_url;
            delete produto.categorias;
            delete produto.imagens;
            return produto;
        })
        const quantidade = allProducts.length;
        categoria = resultado[0].categoria;
        categoriaId = resultado[0].categoriaId;

        res.render('categorias', { page: `${categoria}`, resultado, categoria, quantidade, totalPage, pageActual });
    },
    cadastrar: (req, res) => {
        let err = req.query.error;
        if (err == 1) {
            err = 'Digite o nome do produto';
        }
        if (err == 2) {
            err = 'informe o preço';
        }
        if (err == 3) {
            err = 'adicione uma foto';
        }
        if (err == 4) {
            err = 'Esta disponível para compra?';
        }

        res.render('cadastrar-produto', { page: 'Cadastrar Produto', err });
    },
    cadastro: async (req, res) => {

        let file = req.files;

        let { nomeP, preco, descricaoP } = req.body;


        if (nomeP.length <= 1) {
            return res.redirect('/produtos/cadastrar-produto?error=1')
        }

        if (!preco) {
            return res.redirect('/produtos/cadastrar-produto?error=2');
        }

        if (!file) {
            return res.redirect('/produtos/cadastrar-produto?error=3');
        }

        let produto = await Produto.create({
            lojas_id: req.session.loja.id,
            nome: nomeP,
            valor: preco,
            descricao: descricaoP,
        })

        let img;

        for (let arquivo of file) {
            img = `/uploads/produtos/${arquivo.originalname}`
            let imagens = await ImagensDeProduto.create({
                image_url: img,
                produtos_id: produto.id
            })
        }
        return res.redirect(`/lojas/perfil-loja/${req.session.loja.id}`);
    },
    fetchCarrinho: async (req, res) => {
        let { id } = req.params;

        // buscar produto no bd
        let produto = await Produto.findByPk(id, {
            attributes: ['id', 'nome', 'valor', 'descricao'],
            include: [{
                model: Loja,
                as: 'lojas',
                attributes: ['id', 'nome']
            }],
        });

        const { lojas } = produto;

        let imagem = await ImagensDeProduto.findOne({
            where: {
                produtos_id: id,
            },
            attributes: ['image_url'],
        })

        res.send({ produto, lojas, imagem });
    },
    show: async (req, res) => {
        // capturar o id do param
        let { id } = req.params;

        // buscar produto no bd
        let produto = await Produto.findByPk(id, {
            attributes: ['id', 'nome', 'valor', 'descricao'],
            include: [{
                model: Loja,
                as: 'lojas',
                attributes: ['id', 'nome']
            }, {
                model: AvaliacoesDeProdutos,
                as: 'avaliacoes',
                include: [{
                    model: Usuario,
                    as: 'usuarios',
                    attributes: ['id', 'nome', 'sobrenome'],
                }]
            }],
        });

        // quantificar quantidade de vendas
        let quantidadeVendida = await PedidoProduto.findAll({
            where: {
                produtos_id: id,
            },
            attributes: [
                [sequelize.fn('sum', sequelize.col('quantidade')), 'quantidade_vendida']
            ]
        });

        let imagens = await ImagensDeProduto.findAll({
            where: {
                produtos_id: id,
            },
            attributes: ['image_url'],
        })

        const { lojas, avaliacoes } = produto;

        const comentarios = avaliacoes.filter(avaliacao => avaliacao.comentario)

        // contabilizar avaliações
        let { quantidades, media } = await contarAvaliacoes(avaliacoes);

        var produtosLoja = await PedidoProduto.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('quantidade')), 'quantidade_vendida'],
                'produtos_id',
            ],
            order: sequelize.literal('sum(quantidade) DESC'),
            group: ['produtos_id'],
            limit: 4,
            include: [{
                model: Produto,
                as: 'produtos',
                attributes: ['id', 'nome', 'valor'],
                include: [{
                    model: ImagensDeProduto,
                    as: 'imagens',
                    attributes: ['image_url'],
                    limit: 1,
                }],
                where: sequelize.literal('`produtos`.`id` <> ' + produto.id),
            }]
        })

        let avaliacoesProdutosLoja = await Produto.findAll({
            include: [{
                model: AvaliacoesDeProdutos,
                as: 'avaliacoes',
                attributes: [
                    [sequelize.fn('avg', sequelize.col('classificacao')), 'media'],
                    [sequelize.fn('count', sequelize.col('classificacao')), 'quantidadeAvaliacoes']
                ],
            }],
            group: ['avaliacoes.produtos_id'],
            attributes: ['id'],
        });

        produtosLoja = produtosLoja.map(produtoLoja => {
            produtoLoja = produtoLoja.toJSON();
            let avaliacaoP = avaliacoesProdutosLoja.find(avaliacao => {
                avaliacao = avaliacao.toJSON();
                return avaliacao.id == produtoLoja.produtos_id;
            })
            if (avaliacaoP) {
                avaliacaoP = avaliacaoP.avaliacoes;
                produtoLoja.avaliacoes = avaliacaoP[0];
            } else {
                produtoLoja.avaliacoes = '';
            }
            return produtoLoja;
        });

        // formatar objeto de resposta para o front-end
        function formatarObjeto(objetos) {
            objetos = objetos.map(objeto => {
                delete objeto.produtos.id;
                delete objeto.quantidade_vendida;
                objeto.id = objeto.produtos_id;
                delete objeto.produtos_id;
                objeto.nome = objeto.produtos.nome;
                objeto.valor = objeto.produtos.valor;
                if (objeto.produtos.imagens[0]) {
                    objeto.imagem = objeto.produtos.imagens[0].image_url;
                }
                delete objeto.produtos;
                if (objeto.avaliacoes) {
                    objeto.avaliacoes = objeto.avaliacoes.toJSON();
                }
                return objeto;
            })
            return objetos;
        }

        // formatar objeto de resposta para o front-end
        produtosLoja = formatarObjeto(produtosLoja);

        // return res.send(produtosLoja);

        return res.render('produto', { page: produto.nome, produto, lojas, avaliacoes, comentarios, quantidadeVendida, quantidades, media, imagens, produtosLoja });
    },
    editar: async (req, res) => {

        const { id } = req.params;

        if (!res.locals.loja) {
            req.session.urlPosLogin = req.originalUrl;
            return res.redirect('/usuarios/logar');
        }

        const idLojaLogada = res.locals.loja.id;

        const produto = await Produto.findByPk(id, {
            attributes: ['id', 'nome', 'valor', 'descricao'],
            include: {
                model: Loja,
                as: 'lojas',
                attributes: ['id'],
            },
        })

        if (idLojaLogada != produto.lojas.id) {
            return res.redirect(`/lojas/perfil-loja/${idLojaLogada}`);
        }

        return res.render('editar-produto', { page: 'Editar Produto', produto })

    },
    update: async (req, res) => {
        const { id } = req.params;

        const { nome, descricao, valor } = req.body;

        await Produto.update({
            nome,
            descricao,
            valor,
        }, {
            where: { id },
        })

        return res.redirect(`/produtos/${id}`)
    },
}

function contarAvaliacoes(avaliacoes) {
    var q1 = 0, q2 = 0, q3 = 0, q4 = 0, q5 = 0;
    var media = 0
    for (let i = 0; i < avaliacoes.length; i++) {
        switch (avaliacoes[i].classificacao) {
            case 1:
                q1++;
                break;
            case 2:
                q2++;
                break;
            case 3:
                q3++
                break;
            case 4:
                q4++;
                break;
            case 5:
                q5++;
                break;
        }
        media += Number(avaliacoes[i].classificacao);
    }
    const quantidades = [avaliacoes.length, q1, q2, q3, q4, q5];
    media = media / quantidades[0];
    return { quantidades, media };
}