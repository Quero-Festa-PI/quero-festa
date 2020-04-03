var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/aniversario', function(req, res, next) {
  res.render('aniversario', {page:'Aniversario', menuId:'aniversario'});
});

router.get('/bodas', function(req, res, next) {
  res.render('bodas', {page:'Bodas', menuId:'bodas'});
});

router.get('/especiais', function(req, res, next) {
  res.render('especiais', {page:'Especiais', menuId:'especiais'});
});

router.get('/comemoracoes', function(req, res, next) {
  res.render('comemoracoes', {page:'comemoracoes', menuId:'comemoracoes'});
});

router.get('/painel-cliente', function(req, res, next) {
  res.render('painel-cliente', {page:'painel-cliente', menuId:'login'});
});

router.get('/painel-vendedor', function(req, res, next) {
  res.render('painel-vendedor', {page:'painel-vendedor', menuId:'login'});
});

module.exports = router;
