//const sauces = require('../models/sauce');

exports.getAllSauces = (req, res, next) => {
    res.status(200).json({message: "La route get des sauces est paramétrée"})
};