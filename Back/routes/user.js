const express = require('express');
const router = express.Router() /*Création d'un router*/
const userController = require('../controllers/user');

router.post('/signup', userController.createUser);
router.post('/login', userController.login);

module.exports = router;