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
  return res.json(api[Math.floor(Math.random() * (api.length))]);
});

app.get('/help', urlencoder, (req, res) => {
	
  res.send(`
    <h3>GET http://localhost:3000/random</h3>
    `);
});


app.post('/', urlencoder, (req, res) => {
  const frase1 = req.body.frase;
  const autor1 = req.body.autor;
  api.push({ frase: frase1, autor: autor1 });
  fs.writeJson('./api.json', api)
    .then(() => {
      console.log('sucesso')
      res.json({msg:'sucesso'})
    })
    .catch((err) => console.log(err));
});

app.listen(3000, console.log('startd'));
