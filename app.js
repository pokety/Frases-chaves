const express = require('express');
const app = express();
const path = require('path');
const bodyparse = require('body-parser');
const api = require('./api.json');
const fs = require('fs-extra');
const cors = require('cors');

const urlencoder = bodyparse.urlencoded({ extended: false });

app.use(cors());
app.get('/api', (req, res) => {
  return res.json(api);
});
app.get('/ramdon', (req, res) => {
  return res.json(api[Math.floor(Math.random() * 29)]);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/', urlencoder, (req, res) => {
  const frase1 = req.body.frase;
  const autor1 = req.body.autor;
  api.push({ frase: frase1, autor: autor1 });
  fs.writeJson('./api.json', api)
    .then(() => console.log('sucesso'))
    .catch((err) => console.log(err));
  console.log(api);
});

app.listen(3000, console.log('startd'));
