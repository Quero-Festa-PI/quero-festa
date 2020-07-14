const bcrypt = require('bcrypt');
const { sequelize, Produto, PedidoProduto, AvaliacoesDeProdutos, Loja, ImagensDeProduto } = require('../database/models')

module.exports = {

    index: async (req, res) => {

        // consultar os 12 produtos mais vendidos do site
        let produtos = await PedidoProduto.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('quantidade')), 'quantidade_vendida'],
                'produtos_id',
            ],
            order: sequelize.literal('sum(quantidade) DESC'),
            group: ['produtos_id'],
            limit: 12,
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
            }]
        })

        // consultar avaliações
        let avaliacoes = await Produto.findAll({
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

        // incluir avaliacoes nos objetos dos produtos
        produtos = produtos.map(produto => {
            produto = produto.toJSON();
            let avaliacaoP = avaliacoes.find(avaliacao => {
                avaliacao = avaliacao.toJSON();
                return avaliacao.id == produto.produtos_id;
            })
            if (avaliacaoP) {
                avaliacaoP = avaliacaoP.avaliacoes;
                produto.avaliacoes = avaliacaoP[0];
            } else {
                produto.avaliacoes = '';
            }
            return produto;
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
        produtos = formatarObjeto(produtos);

        return res.render('index', { page: 'Página Inicial', produtos });
    },
    alterarNavegacao: (req, res) => {
        req.session.navegacaoLoja = !req.session.navegacaoLoja;

        res.redirect(req.headers.referer.replace('http://localhost:3000', ""))
    }

}