const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
});

//Deixei alguns routers prontos, só alterar o '/endereco' e o mesmo para o arquivo que retorna no res.sendFile
router.get('/categorias',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
});

router.get('/Aniversario',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
});



app.use('/', router);
app.listen(process.env.port || 3000);

console.log('PI QUERO FESTA DISPONÍVEL NA PORTA 3000!');