const express = require('express');
const bodyParser = require('body-parser');
const etudiantRouter = require('./etudiant');

const app = express();
const port = 3000;
// Servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static('public'));

// Middleware pour parser le corps des requêtes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Montage du routeur étudiant
app.use('/etudiants', etudiantRouter);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
