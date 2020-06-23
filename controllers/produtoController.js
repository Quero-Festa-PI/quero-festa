const { sequelize, Sequelize, Produto, AvaliacoesDeProdutos, ImagensDeProduto, Loja } = require('../database/models')
const Op = Sequelize.Op;

module.exports = {
    buscar: async (req, res) => {

        // armazenar parametros da pesquisa
        let search = req.query.search;
        let pageActual = req.query.page;

        // pagina e limite padrões
        if (!pageActual) { pageActual = 1; }
        let limitProducts = 10;

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
        let err = req.query.error;
        if(err == 1){
            err = 'Digite o nome do produto';
        }
        if(err == 2){
            err = 'informe o preço';
        }
        if(err == 4){
            err = 'Esta disponível para compra?';
        }          
        
        res.render('cadastrar-produto', { page: 'cadastrar-produto', err});
    },
    cadastro: async (req, res) => {

        let file = req.files[0].originalname;
        let img = `/uploads/${file}`;               
        let {nomeP, preco, descricaoP, disponibilidade} = req.body;
        
       
        if(nomeP.length <= 3){
            res.redirect('/produtos/cadastrar-produto?error=1')
        }

        if(preco.length < 3){
            res.redirect('/produtos/cadastrar-produto?error=2');
        }

        if(disponibilidade == null){
            res.redirect('/produtos/cadastrar-produto?error=4');
        }
        
        let produto = await Produto.create({
            lojas_id: req.session.loja.id,
            nome: nomeP,
            valor: preco,
            descricao: descricaoP,
            disponibilidade
        })
        let imagens = await ImagensDeProduto.create({
            image_url: img,
            produtos_id: produto.id
        })
        res.redirect(`/loja/${req.session.loja.id}`);
    },
    produto: (req, res) => {
        res.render('produto', { page: 'produto' });
    }

}

