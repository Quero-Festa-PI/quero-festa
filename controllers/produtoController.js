module.exports = {
    buscar: (req, res) => {
        res.render('buscar', {page: 'buscar'});
    },

    cadastrar: (req, res) => {
        res.render('cadastrar-produto', {page: 'cadastrar-produto'});
    },
    produto: (req, res) => {
        res.render('produto', {page: 'produto'});
    }  

}