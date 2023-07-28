const multer = require('multer');
const path = require('path');

/*Dictionnaire de récupération des extensions*/
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/tiff': 'tiff',
    'image/tif': 'tif',
    'image/webp': 'webp'
  };

/* Constante définissant la destination et le nom d'enregistrement des fichiers entrants*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const absolutePath = path.resolve('./images'); /* Création d'une route statique */
      cb(null, absolutePath);
    },
    filename: function (req, file, cb) { /* Definition d'un nom de fichier */
      const nameWithExtension = file.originalname.split(" ").join("_");
      const name = nameWithExtension.split(".")[0];
      const extension = MIME_TYPES[file.mimetype];
      cb(null, name + Date.now() + "." + extension);
    }
  });

  module.exports = multer({storage: storage}).single('image');
  