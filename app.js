const express = require('express');
const app = express();
const path = require('path');
const bodyparse = require('body-parser');
const api = require('./api.json');
const fs = require('fs-extra');

const urlencoder = bodyparse.urlencoded({ extended: false });

app.all('*',(req,res,next)=>{
  res.set('Acess-Control-Allow-Origin','*')
  next()
})

app.get('/', (req, res) => {
  return res.json(api);
});
app.get('/random', (req, res) => {
  return res.json(api[Math.floor(Math.random() * 29)]);
});

app.get('/api', urlencoder, (req, res) => {
  fs.readJson('./api.json', (err, obj) => {
    let stringado = JSON.stringify(obj[Math.floor(Math.random() * 29)].frase);
    console.log(stringado.slice(1, stringado.length - 1));
    res.send(`<h1>${stringado.slice(1, stringado.length - 1)}</h1>`);
  });
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
