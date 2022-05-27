# PROJET 7 - OPENCLASSROOMS - DEVELOPPEUR WEB

## Groupomania - Réseau social d'entreprise

Compétences évaluées :

- Authentifier un utilisateur et maintenir sa session
- Personnaliser le contenu envoyé à un client web
- Gérer un stockage de données à l'aide de SQL
- Implémenter un stockage de données sécurisé en utilisant SQL

### INSTALLATION

Prérequis :
Il vous faut avoir installé sur votre machine :

Git : https://git-scm.com/downloads
Node.js : https://nodejs.org/en/
MySql : https://dev.mysql.com/downloads/installer/

Créer un dossier vide puis cloner ce repository à l'intérieur :
git clone https://github.com/franz-vb/P7_franzVonBueren_23022022.git

### MySQL

Dans le fichier groupomania/backend/.env ,mettre le mot de passe d'accès à votre base de donnée et votre nom d'utilisateur si besoin (root par défaut)
DB_USER=root
DB_PASS=

Ouvrir MySql command Line client puis effectuer ces deux lignes de commandes :

CREATE DATABASE groupomania;
USE groupomania;
### BACK END

Ouvrir un terminal dans le dossier backend puis effectuer les lignes de commandes suivantes :

npm install
nodemon server.js

### FRONT END

Ouvrir un autre terminal dans le dossier frontend puis effectuer les lignes de commandes suivantes :

npm install
npm run start
Ouvrir le navigateur a l'adresse http://localhost:3000/

## Fonctionnalités :

Le site permet de

- Partager des posts (avec ou sans photos)
- Commenter et liker des posts
- Personnaliser son profil (changement de pseudo)
- Modifier et supprimer son compte

Un compte admin est présent pour la modération (suppression des posts et commentaires d'autres utilisateurs).
Voici les codes d'accès admin :

admin@admin.admin
adminF

Bonne visite !
