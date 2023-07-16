const user = require('../models/user'); /*importation du schéma*/
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
        .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({error}));
};