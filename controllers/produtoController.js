const { Sequelize, Produto } = require('../database/models')
const Op = Sequelize.Op;

module.exports = {
    buscar: async (req, res) => {

        busca = req.query.query;

        let produtos = await Produto.findAll(
            {
                where: {
                    nome: {
                        [Op.like]: '%' + busca + '%'
                    }
                }
            }
        );

        res.render('buscar', { page: 'Buscar', produtos, busca });
    },

    cadastrar: (req, res) => {
        res.render('cadastrar-produto', { page: 'cadastrar-produto' });
    },
    produto: (req, res) => {
        res.render('produto', { page: 'produto' });
    }

}

