module.exports = (req, res, next) => {
    if (req.session.usuario) {
        var usuario = req.session.usuario;
    } else {
        var usuario = "Não há usuário logado no sistema."
    }
    res.usuario = usuario;
    next();
}