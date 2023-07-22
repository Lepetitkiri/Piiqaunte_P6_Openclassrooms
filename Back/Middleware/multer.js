const multer = require('multer');

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
      cb(null, './images');
    },
    filename: function (req, file, cb) {
      const nameWithExtension = file.originalname.split(" ").join("_");
      const name = nameWithExtension.split(".")[0];
      const extension = MIME_TYPES[file.mimetype];
      cb(null, name + Date.now() + "." + extension);
    }
  });

  module.exports = multer({storage: storage}).single('image');
  