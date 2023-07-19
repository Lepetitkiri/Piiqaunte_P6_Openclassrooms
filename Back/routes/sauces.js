const express = require('express');
const router = express.Router() /*Création d'un router*/
const saucesController = require('../controllers/sauces');
const auth = require('../Middleware/auth'); /*importation du Middleware de vérification de Token*/
const multer = require('../Middleware/multer'); /*importation du Middleware d'enregistrement des fichiers'*/

router.get('', auth, saucesController.getAllSauces);
router.get('/:id', auth, saucesController.getOneSauce);
router.post('', auth, saucesController.createANewSauce);
router.delete('/:id', auth, saucesController.deleteOneSauce);

module.exports = router;