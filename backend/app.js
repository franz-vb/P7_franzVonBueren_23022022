// mise en place de Express
require('dotenv').config();
const express = require('express'); //importe le serveur express
const app = express(); // créer l'application express
const userRouter = require("./api/routes");
/* const path = require('path');/* Permet de créer une route vers notre dossier images */
/* const { endianness } = require('os'); */

app.use(express.json());//Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON

/*Cross Origin Resource Sharing. système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents, 
ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise toutes les oigines à utiliser l'api
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // type des différents header
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // méthodes
    next(); // méthode next permet à chaque middleware de passer l'exécution au middleware suivant
});

app.use("/api/users", userRouter);

module.exports = app;