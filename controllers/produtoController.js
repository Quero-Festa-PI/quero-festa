const { sequelize, Sequelize, Produto, AvaliacoesDeProdutos, Usuario, Loja, PedidoProduto } = require('../database/models')
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
            include: {
                model: AvaliacoesDeProdutos,
                as: 'avaliacoes',
                attributes: [
                    [sequelize.fn('avg', sequelize.col('classificacao')), 'media'],
                    [sequelize.fn('count', sequelize.col('classificacao')), 'quantidade']
                ],
            },
            group: ['produtos_id'],
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
    cadastrar: (req, res) => {
        res.render('cadastrar-produto', { page: 'cadastrar-produto' });
    },
    produto: (req, res) => {
        res.render('produto', { page: 'produto' });
    },
    show: async (req, res) => {
        // capturar o id do param
        let { id } = req.params;

        // buscar produto no bd
        let produto = await Produto.findByPk(id, {
            attributes: ['id', 'nome', 'valor', 'disponibilidade', 'descricao'],
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

        const { loja, avaliacoes } = produto;

        // contabilizar avaliações
        let { quantidades, media } = await contarAvaliacoes(avaliacoes);

        return res.render('produto', { page: produto.nome, produto, loja, avaliacoes, quantidadeVendida, quantidades, media });
    }
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