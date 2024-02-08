const express = require('express');
const mysql = require('mysql');

const router = express.Router();

// Configurer MySQL
const connection = mysql.createConnection({
host: 'localhost',
user: 'root', // Votre nom d'utilisateur MySQL
password: '', // Votre mot de passe MySQL
database: 'etudiant' // Le nom de votre base de données
});

connection.connect(err => {
if (err) {
console.error('Erreur de connexion à la base de données :', err);
return;
}
console.log('Connecté à la base de données MySQL');
});

// Récupérer tous les étudiants
router.get('/', (req, res) => {
connection.query('SELECT * FROM etudiants', (error, results) => {
if (error) throw error;
res.json(results);
});
});

// Récupérer un étudiant par ID
router.get('/:id', (req, res) => {
const { id } = req.params;
connection.query('SELECT * FROM etudiants WHERE id = ?', id, (error, results) => {
if (error) throw error;
if (results.length === 0) {
res.status(404).json({ message: 'Étudiant non trouvé' });
} else {
res.json(results[0]);
}
});
});

// Ajouter un nouvel étudiant
router.post('/', (req, res) => {
const { nom, prenom, age } = req.body;
const etudiant = { nom, prenom, age };
connection.query('INSERT INTO etudiants SET ?', etudiant, (error, results) => {
if (error) throw error;
res.json({ id: results.insertId, ...etudiant });
});
});

// Mettre à jour un étudiant par ID
router.put('/:id', (req, res) => {
const { id } = req.params;
const { nom, prenom, age } = req.body;
const etudiant = { nom, prenom, age };
connection.query('UPDATE etudiants SET ? WHERE id = ?', [etudiant, id], (error, results) => {
if (error) throw error;
if (results.affectedRows === 0) {
res.status(404).json({ message: 'Étudiant non trouvé' });
} else {
res.json({ id, ...etudiant });
}
});
});

// Supprimer un étudiant par ID
router.delete('/:id', (req, res) => {
const { id } = req.params;
connection.query('DELETE FROM etudiants WHERE id = ?', id, (error, results) => {
if (error) throw error;
if (results.affectedRows === 0) {
res.status(404).json({ message: 'Étudiant non trouvé' });
} else {
res.json({ message: 'Étudiant supprimé avec succès' });
}
});
});


// Récupérer tous les étudiants
router.get('/', (req, res) => {
    connection.query('SELECT * FROM etudiants', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
// Récupérer tous les étudiants
router.get('/', (req, res) => {
    connection.query('SELECT * FROM etudiants', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
// Autres routes CRUD pour les étudiants (ajouter, mettre à jour, supprimer, etc.)

module.exports = router;


module.exports = router;
