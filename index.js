const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render("index.ejs");
});

http.listen(port, function(){
  console.log('Server listen ' + port);
});