const multer = require('multer');

/*Dictionnaire de récupération des extensions*/
const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png',
    'images/tiff': 'tiff',
    'images/tif': 'tif',
    'images/webp': 'webp'
  };

/* Constante définissant la destination et le nom d'enregistrement des fichiers entrants*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../images');
    },
    filename: function (req, file, cb) {
      cb(null, 'nom_de_fichier');
    }
  });

  module.exports = multer({storage: storage}).single('image');
  