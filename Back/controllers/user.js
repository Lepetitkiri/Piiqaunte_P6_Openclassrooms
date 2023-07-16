const user = require('../models/user'); /*importation du schéma*/

exports.createUser = (req, res, next) => {
    res.statusCode = 200;
    res.end("Le requête Post vers /api/auth/signup fonctionne !");
}