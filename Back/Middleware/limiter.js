const express = require('express');
const rateLimit = require('express-rate-limit');

/* Limitation du nombre de tentative de login */
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, /* Periode : 1 heure*/
    max: 5, /*Nb de tentatives*/
    message: 'Si vous essayez de nous pirater, passez votre chemin ! Si vous avez juste oublié vos identifiants il faudra ré-essayer dans 1 heure malheureusement ! ',
  });

  module.exports = limiter;