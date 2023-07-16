const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/user');

require('dotenv').config();

mongoose.connect(process.env.mongoDBURI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  /* Prolèmes de CORS*/
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
 });

app.use(express.json()); /*Ajout du middleware express.json() à express pour pouvoir récupérer les données des requêtes via req.body*/

app.use('/api/auth', userRoutes);

module.exports = app;