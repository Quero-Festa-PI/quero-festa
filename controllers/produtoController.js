const { Sequelize, Produto } = require('../database/models')
const Op = Sequelize.Op;

module.exports = {
    buscar: async (req, res) => {
        console.log(res.usuario);
        usuario = res.usuario;

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

        res.render('buscar', { page: 'Buscar', usuario, produtos, busca });
    },

    cadastrar: (req, res) => {
        console.log(res.usuario);
        usuario = res.usuario;
        res.render('cadastrar-produto', { page: 'cadastrar-produto', usuario });
    },
    produto: (req, res) => {
        console.log(res.usuario);
        usuario = res.usuario;
        res.render('produto', { page: 'produto', usuario });
    }

}

