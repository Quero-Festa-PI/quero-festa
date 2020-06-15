const { Sequelize, Produto } = require('../database/models')
const Op = Sequelize.Op;

module.exports = {
    buscar: async (req, res) => {

        let search = req.query.search;
        let pageActual = req.query.page;

        // pagina e limite padrões
        if (!pageActual) { pageActual = 1; }
        let limitProducts = 10

        let allProducts = await Produto.findAll({ where: { nome: { [Op.like]: '%' + search + '%' } } });

        function listProducts(allProducts, pageActual, limitProducts) {
            let result = [];
            let totalPage = Math.ceil(allProducts.length / limitProducts);
            let count = (pageActual * limitProducts) - limitProducts;
            let delimiter = count + limitProducts;

            if (pageActual <= totalPage) {
                for (let i = count; i < delimiter; i++) {
                    if (allProducts[i]) {
                        result.push(allProducts[i]);
                    }
                }
            } else {
                res.send('Página ultrapassou limite');
            }

            return result;
        };

        const resultado = listProducts(allProducts, pageActual, limitProducts);

        res.render('buscar', { page: 'Resultado da Busca', resultado, search });
    },
    cadastrar: (req, res) => {
        res.render('cadastrar-produto', { page: 'cadastrar-produto' });
    },
    produto: (req, res) => {
        res.render('produto', { page: 'produto' });
    }

}

