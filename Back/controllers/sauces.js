const sauces = require('../models/sauce'); /*importation du schema*/
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');


/* Enregistrement dans la base de données d'une nouvelle sauce via POST vers /api/sauces*/
exports.createANewSauce = async (req, res, next) => {

  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; /*Suppression de l'id de l'utilisateur pour éviter les usurpations*/

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
      const filename = sauce.imageUrl.split('/images/')[1] /*Suppression de l'image dans la database*/
      fs.unlink(`images/${filename}`, ()=>{
        sauce.deleteOne({_id: req.params.id}) /*Suppression de la sauce dans la database*/
        .then((sauce) => res.status(200).json({ message: `Bye Bye la sauce, on te supprime définitivement !` }))
        .catch((error) => res.status(404).json({ error })); /*Erreur dans la suppression de la sauce*/
      })
    } else {
       res.status(403).json({ message: "Vous n'êtes pas habilité à toucher à la sauce des autres !" })
    };
  })
  .catch((error) => res.status(404).json({ error })); /*Erreur de traitement de la requete*/
};


/*Modification d'une sauce via PUT vers api/sauces/:id*/
exports.modifySauce = (req, res, next) => {

  let newSauce;
  (req.file === undefined) /*Définition de newSauce en fonction de si la requete contient une nouvelle image ou non*/
    ? (
      newSauce = req.body
      )
    : ( 
      sauceObject = JSON.parse(req.body.sauce),
      newSauce = {
        name: sauceObject.name,
        manufacturer: sauceObject.manufacturer,
        description: sauceObject.description,
        mainPepper: sauceObject.mainPepper,
        heat: sauceObject.heat,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    );

    delete newSauce.userId; /* Suppression de l'id pour éviter les usurpations*/

    sauces.findOne({_id: req.params.id}) /*Recherche de la sauce correspondante dans la database*/
    .then((sauce) => { /*La sauce a été trouvée dans la database*/

      if (req.auth.userId !== sauce.userId) { /*Vérification de la légitimité de l'utilisateur*/
        res.status(403).json({ message: "Vous n'êtes pas habilité à toucher à la sauce des autres !" })
      } else {

        if (req.file === undefined) { /*Seul le texte est MAJ*/
            sauces.updateOne({ _id: req.params.id }, {
              $set: {
                name: newSauce.name,
                manufacturer: newSauce.manufacturer,
                description: newSauce.description,
                mainPepper: newSauce.mainPepper,
                heat: newSauce.heat
              }
            })
            .then(() => res.status(200).json({ message: `Le texte de la sauce a bien été mis à jour !` }))
            .catch((error) => res.status(401).json({ error })); /*Erreur de la requete updateOne*/

          } else { /*Le texte ET l'image sont MAJ*/
          sauces.updateOne({ _id: req.params.id }, newSauce)
          .then(() => res.status(200).json({ message: `Le texte et l'image de la sauce ont bien été mis à jour !` }))
          .catch((error) => res.status(401).json({ error })); /*Erreur de la requete updateOne*/
          };
      }

    })
    .catch((error) => res.status(404).json({ error })); /*Erreur de traitement de la requete findOne*/
};


/* Like/Dislike d'une sauce via POST vers /api/sauces/:id/like */
exports.likeOrDislikeaASauce = (req, res, next) => {

  sauces.findOne({_id: req.params.id}) /*Recherche de la sauce correspondante dans la database*/
  .then((sauce) => { /*La sauce a été trouvée dans la database*/

      /* Cas du like : req.body.like = 1 signifie que l'utilisateur était neutre et qu'il cherche à liker pour la première fois */
      if (req.body.like === 1) {
        /* On vérifie que son nom n'apparait pas dans sauce.usersLiked */
        if (!sauce.usersLiked.includes(req.auth.userId)) {
          /* On ajoute un like a sauce.likes et on ajoute son nom à sauce.usersLiked */
          sauce.likes += 1;
          sauce.usersLiked.push(req.auth.userId);
        } else {
          res.status(403).json({ message: "Vous ne pouvez pas liker 2 fois la même sauce même si elle est délicieuse !"})
        }


      } else {

        /* Cas du dislike : req.body.like = -1 signifie que l'utilisateur était neutre et qu'il cherche à disliker pour la première fois */
        if (req.body.like === -1) {
          /* On vérifie que son nom n'apparait pas dans sauce.usersDisliked */
          if (!sauce.usersDisliked.includes(req.auth.userId)) {
            /* On ajoute un dislike a sauce.dislikes et on ajoute son nom à sauce.usersDisliked */
            sauce.dislikes += 1;
            sauce.usersDisliked.push(req.auth.userId);
          } else {
            res.status(403).json({ message: "Vous ne pouvez pas disliker 2 fois la même sauce même si elle est vraiment mauvaise !"})
          }


        } else {
          /* Cas de l'annulation : req.body.like = 0 signifie que l'utilisateur cherche à annuler son like/dislike */
          /* Pour pouvoir réaliser l'action, il faut d'abord connaitre son statut préalable (likait-il ou dislikait il?) */
          if (sauce.usersLiked.includes(req.auth.userId)) { /* L'utilisateur likait auparavant*/
            /* On supprime un like a sauce.likes et on supprime son nom de sauce.usersLiked */
            sauce.likes -= 1;
            sauce.usersLiked = sauce.usersLiked.filter(userId => userId !== req.auth.userId);

          } else { /* L'utilisateur dislikait auparavant */
            /* On supprime un dislike a sauce.dislikes et on supprime son nom de sauce.usersDisliked */
            sauce.dislikes -= 1;
            sauce.usersDisliked = sauce.usersDisliked.filter(userId => userId !== req.auth.userId);
          }
        }
      }


    /* Dans tous les cas, on enregistre les modifications effectuées sur la sauce dans la database */
    sauce.save()
    .then(() => res.status(200).json({ message: 'Action de like/dislike correctement executée !' }))
    .catch(error => res.status(400).json({ error }));

  })
  .catch((error) => res.status(404).json({ error })); /*Erreur de traitement de la requete findOne*/
};