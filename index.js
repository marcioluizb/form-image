const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const md5 = require('md5');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const port = 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/assets', express.static('./assets'));

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.get('/', function(req, res){
  res.render("index.ejs");
});

app.post('/image', urlencodedParser, function(req, res){
  // Obtendo a imagem string que representa a imagem fornecida, encodada em base 64 e encriptada com AES 256
  const encriypedAndEncodedImage = req.body.image_hash;

  // Obtendo a chave que encriptou a imagem
  const KEY_URL = req.body.url;
  const KEY = md5(KEY_URL);

  // Função para decriptar um texto em hexadecimal com a chave fornecida usando AES 256 ECB
  function decrypt(key, text) {
      var decipher = crypto.createDecipheriv('aes-256-ecb', key.toString('binary'), '');
      decipher.setAutoPadding(false);
      var dec = decipher.update(text, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec
  }

  // Função que cria um arquivo de imagem a partir da string base64 desta
  function decode_base64(base64str, filename) {
      var buf = Buffer.from(base64str, 'base64');
      fs.writeFileSync(path.join(__dirname, filename), buf);
  }

  const encodedImage = decrypt(KEY, encriypedAndEncodedImage);
  decode_base64(encodedImage, './assets/images/original_image.png');
  res.render('result.ejs', {data: true});
});

http.listen(port, function(){
  console.log('Server listen ' + port);
});