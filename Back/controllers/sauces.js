const sauces = require('../models/sauce'); /*importation du schema*/
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

/* Enregistrement dans la base de données d'une nouvelle sauce via POST vers /api/sauces*/
exports.createANewSauce = async (req, res, next) => {

  const sauceObject = req.body.sauce;
  delete sauceObject._id;

  const newSauce = new sauces({
    userId: req.auth.userId,
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    mainPepper: sauceObject.mainPepper,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
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
  .then((saucesData) => res.status(200).json(saucesData))
  .catch((error) => res.status(500).json({ error })); /*Erreur de traitement de la requete*/
};

/*Récupération d'une sauce spécifique de la base de données via GET vers /api/sauces/:id*/
exports.getOneSauce = (req, res, next) => {
  sauces.findOne({_id: req.params.id})
  .then((sauce) => res.status(200).json(sauce))
  .catch((error) => res.status(404).json({ error })); /*Erreur de traitement de la requete*/
};

/*Suppression de la base de données d'une sauce via DELETE vers /api/sauces/:id*/
exports.deleteOneSauce = (req, res, next) => {
  sauces.findOne({_id: req.params.id}) /*Récupération de la sauce dans la database*/
  .then((sauce) => {
    if (req.auth.userId === sauce.userId) {
      sauce.deleteOne({_id: req.params.id})
      .then((sauce) => res.status(200).json({ message: `Bye Bye la sauce, on te supprime définitivement !` }))
      .catch((error) => res.status(404).json({ error })) /*Erreur dans la suppression de la sauce*/
    } else {
       res.status(403).json({ message: "Vous n'êtes pas habilité à toucher à la sauce des autres !" })
    };
  })
  .catch((error) => res.status(404).json({ error })); /*Erreur de traitement de la requete*/
};