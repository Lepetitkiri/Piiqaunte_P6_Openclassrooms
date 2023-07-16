const user = require('../models/user'); /*importation du schéma*/

exports.createUser = (req, res, next) => {
    /* Création d'une instance de user */
    const newUser = new user({
        email: req.body.email,
        password: req.body.password
    });
    newUser.save() 
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
};