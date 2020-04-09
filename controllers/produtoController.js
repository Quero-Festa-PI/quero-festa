module.exports = {
    buscar: (req, res) => {
        res.render('buscar', {page: 'buscar'});
    },

    cadastrar: (req, res) => {
        res.render('cadastrar-produto', {page: 'cadastrar-produto'});
    },

    // Categorias de produtos 

    aniversario: (req, res, next) => {
        res.render('aniversario', {page:'Aniversario', menuId:'aniversario'});
    },
      
    bodas: (req, res, next) => {
    res.render('bodas', {page:'Bodas', menuId:'bodas'});
    },

    especiais: (req, res, next) => {
        res.render('especiais', {page:'Especiais', menuId:'especiais'});
      },
    comemoracoes: (req, res, next) => {
        res.render('comemoracoes', {page:'comemoracoes', menuId:'comemoracoes'});
      } 

}