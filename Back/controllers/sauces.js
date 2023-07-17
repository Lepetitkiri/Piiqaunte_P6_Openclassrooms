const sauces = require('../models/sauce');

/* Récupération de toutes les sauces de la base de données via GET vers /api/sauces*/
exports.getAllSauces = (req, res, next) => {
    sauces.find()
    .then(res.status(200).json({sauces}))
    .catch((error) => res.status(500).json({ error })); /*Erreur de traitement de la requete*/
};