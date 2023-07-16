const user = require('../models/user'); /*importation du schéma*/
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); /*importation du package de cryptage du password*/

exports.createUser = (req, res, next) => {
    /*Hashage du password*/
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            /* Création d'une instance de user */
            const newUser = new user({
                email: req.body.email,
                password: hash
            });
            /*Enregistrement de newUser dans la dataBase*/
        newUser.save() 
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error })); /*Erreur de sauvegarde*/
        })
        .catch(error => res.status(500).json({error})); /*Erreur de traitement de la requete*/
};


exports.login = (req, res, next) => {
    /*Recherche d'email correspondant dans la database*/
    user.findOne({email: req.body.email}, {password: 0})
    .then((user) => {
        if (user !== null) {
            res.status(200).json({ message: 'Utilisateur trouvé' })
        } else {
            res.status(404).json({ message: 'Mauvaise correspondance email/mot de passe !' }) /*Erreur de correspondance de l'email dans la database*/
        }})
    .catch(error => res.status(500).json({ error })) /*Erreur de traitement de la requete*/
};