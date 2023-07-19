const sauces = require('../models/sauce'); /*importation du schema*/
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

exports.createANewSauce = (req, res, next) => {

    const sauceObject = req.body;
    delete sauceObject._id;
  
    const newSauce = new sauces({
      userId: req.auth.userId,
      name: sauceObject.name,
      manufacturer: req.body.manufacturer,
      description: sauceObject.description,
      mainPepper: sauceObject.mainPepper,
      imageUrl: sauceObject.imageUrl, /*Modifier imageUrl via le Middleware multer*/
      heat: sauceObject.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    });
      newSauce.save()
      .then(() => {
        res.status(201).json({ message: 'Sauce enregistrée', sauce: newSauce });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
};

/* Récupération de toutes les sauces de la base de données via GET vers /api/sauces*/
exports.getAllSauces = (req, res, next) => {
  sauces.find()
  .then((saucesData) => res.status(200).json({ sauces: saucesData }))
  .catch((error) => res.status(500).json({ error })); /*Erreur de traitement de la requete*/
};