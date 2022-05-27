const { createPool } = require("mysql");

/* MULTIPLESATEMENT permet d'envoyer plusieurs requêtes SQL dans une seule query */ 
/* pool permet de se connecter à la DB mysql */ 
const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    multipleStatements: true,
    connectionLimit: 10
});

module.exports = pool;