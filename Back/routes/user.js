const express = require('express');
const router = express.Router() /*Création d'un router*/
const userController = require('../controllers/user');

router.post('/signup', userController.createUser);

module.exports = router;