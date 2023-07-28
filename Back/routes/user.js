const express = require('express');
const router = express.Router() /*Création d'un router*/
const userController = require('../controllers/user'); /*Importation du controller*/
const limiter = require('../Middleware/limiter'); /*importation du Middleware de limitation du nombre de tentatives de connexion*/

router.post('/signup', userController.createUser);
router.post('/login', limiter, userController.login);

module.exports = router;