module.exports = {
    buscar: (req, res) => {
        res.render('buscar', {page: 'buscar'});
    },

    cadastrar: (req, res) => {
        res.render('cadastrar-produto', {page: 'cadastrar-produto'});
    }   

}