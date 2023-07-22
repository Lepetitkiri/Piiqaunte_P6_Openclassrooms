const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces');

require('dotenv').config();

mongoose.connect(process.env.mongoDBURI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/*Middleware d'analyse des requêtes JSON*/
app.use(bodyParser.json());
/*Middleware d'analyse des requêtes via des formulaires HTML*/
app.use(bodyParser.urlencoded({ extended: true }));

  /* Prolèmes de CORS*/
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
 });

app.use(express.json()); /*Ajout du middleware express.json() à express pour pouvoir récupérer les données des requêtes via req.body*/

app.use('/images', express.static(path.join(__dirname, 'images'))); /*Création d'une route statique */
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;