var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');

// Rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lojaRouter = require('./routes/loja');
var produtoRouter = require('./routes/produto');
var pedidoRouter = require('./routes/pedido');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.set('trust proxy', 1);
app.use(session({
  secret: 'qu3r0-f3st4',
  name: 'user-session'
}));

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario;
  res.locals.loja = req.session.loja;
  res.locals.navegacaoLoja = req.session.navegacaoLoja;
  if (req.query._method == 'DELETE') {
    req.method = 'DELETE';
    req.url = req.path;
  }
  next();
})

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/lojas', lojaRouter);
app.use('/produtos', produtoRouter);
app.use('/pedidos', pedidoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { page: 'Erro' });
});

module.exports = app;
