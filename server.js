const express = require('express');
const app = express();
const path = require('path');
const bodyparse = require('body-parser');
const api = require('./public/src/api.json');
const fs = require('fs-extra');

const urlencoder = bodyparse.urlencoded({ extended: false });

app.use(express.static('public'));
app.get('/api', (req, res) => {
  res.send(api);
});
app.get('/', (req, res) => {
  res.send(api[Math.floor(Math.random() * 29)]);
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, './public/admin.html'));
});

app.post('/admin', urlencoder, (req, res) => {
  const frase1 = req.body.frase;
  const autor1 = req.body.autor;
  api.push({ frase: frase1, autor: autor1 });
  fs.writeJson('./public/src/api.json', api)
    .then(() => console.log('sucesso'))
    .catch((err) => console.log(err));
  console.log(api);
});

app.listen(3000, console.log('startd'));
