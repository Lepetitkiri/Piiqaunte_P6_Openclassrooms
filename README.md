# Piiquante_P6_Openclassrooms
Formation Openclassrooms Developpeur web - Projet P6 (Piiquante) - Construire une API sécurisée

Hot Takes est un site de notation de sauces piquantes. Pour accéder à la page des sauces, l'utilisateur doit d'abord se créer un compte ou se connecter à un compte déjà existant. Les différentes fonctionnalités de cette application web sont : l'ajout d'une nouvelle sauce, la possibilité de modifier ou de supprimer une sauce que l'on aurait ajouté et la possibilité de liker ou de disliker n'importe quelle sauce.

# Connection à la base de données Mongo DB

Un fichier `.env` a été ajouté au fichier `.gitignore` et n'est donc pas accéssible sur Github. Ce fichier inclut les identifiants d'accès à la base de données.
Veuillez créer un fichier `.env` dans le dossier `/Back` et y tapper le code suivant `mongoDBURI=mongodb+srv://<USER>:<PASSWORD>@cluster0.zecjbx5.mongodb.net/?retryWrites=true&w=majority` en remplaçant `<USER>` par un nom d'utilisateur valide et `<PASSWORD>` par son mot de passe associé.
Veuillez démarrer le serveur Backend.

# Demarrage du serveur Backend

Veuillez vous assure que `Node.js` est installé. Veuillez vous rendre dans le dossier `/Back` et tapper `node server` dans le terminal de commande.
Un message indiquant "Listening on port 3000" doit apparaitre indiquant que le serveur a correctement démarré.
Si le serveur ne démare pas correctement, veuillez vous assurer que le port 3000 est libre d'accès.
Un message indiquant "Connexion à MongoDB réussie !" doit apparaitre indiquant que vous êtes correctement connecté à la base de données.

# Demarrage du Frontend

Le dossier `/Front` a été ajouté au fichier `.gitignore` et n'est donc pas accéssible sur Github. Veuillez télécharger le dossier `/Front` de votre coté et l'inclure à la racine du projet.
Veuillez vous rendre dans le dossier `/Front` et tapper `npm install` puis `npm run start` dans le terminal.
Veuillez ouvrir un navigateur et vous rendre à l'adresse `http://localhost:4200/`.
