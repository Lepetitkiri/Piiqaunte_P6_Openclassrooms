const express = require('express');
const router = express.Router() /*Création d'un router*/
const saucesController = require('../controllers/sauces');
const auth = require('../Middleware/auth'); /*importation du Middleware de vérification de Token*/

router.get('', auth, saucesController.getAllSauces);

module.exports = router;