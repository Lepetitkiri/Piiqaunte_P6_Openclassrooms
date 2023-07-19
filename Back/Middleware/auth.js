const jwt = require('jsonwebtoken');

require("dotenv").config();

module.exports = (req, res, next) => {
   try {
        /*Récupération du token d'authentification à partir des en-têtes de la requête*/
        const token = req.headers.authorization.split(' ')[1];
        /*Vérification de la validité du token*/
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        /*Extraction de l'ID utilisateur à partir du token décodé*/
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId /*Ajout de l'ID de l'utilisateur à l'objet req pour que les différentes routes puissent l'exploiter*/
        };
        console.log("Token conforme")
    next();
    } catch(error) {
       res.status(403).json({ message: "unauthorized request" });
    };
};