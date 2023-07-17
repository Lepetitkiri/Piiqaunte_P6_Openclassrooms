const express = require('express');
const router = express.Router() /*Création d'un router*/
const saucesController = require('../controllers/sauces');

router.get('', saucesController.getAllSauces);

module.exports = router;