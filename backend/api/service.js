const pool = require('../config/database');

exports.create = (data, callback) => {
    pool.query(`INSERT INTO utilisateurs(pseudo, email, password)
    values(?, ?, ?)`,
        [
            data.pseudo, 
            data.email, 
            data.password, 
        ],
        (error, results, fields) => {
            if (error) { 
                return callback(error)
            }
            return callback(null, results)
        }
    )
}

exports.authentification = (email, callback) => {

   pool.query(`SELECT * FROM utilisateurs WHERE email = ?`,
    [email],
    (error, results, fields) => {
        if (error) {
            return callback(error)
        }
        return callback(null, results[0])
    }
   )
}

exports.getUsers = (callback) => {
    pool.query(`SELECT id, pseudo, email FROM utilisateurs`,
    [], (error, results, fields) => {
        if (error) {
            return callback(error);
        }
        return callback(null, results)
    })
}

exports.getUserById = (id, callback) => {
    pool.query(`SELECT id, pseudo, email FROM utilisateurs WHERE id = ?`,
    [id],
    (error, results, fields) => {
        if (error) {
            return callback(error)
        }
        return callback(null, results[0])
    })
}

exports.updateUser = (data, callback) => {
    pool.query(`UPDATE utilisateurs SET pseudo = ?, email = ?, password = ? WHERE id = ?`,
    [
        data.pseudo, 
        data.email, 
        data.password, 
        data.id
    ],
    (error, results, fields) => {
        if (error) {
            return callback(error);
        }

        return callback(null, results[0])
    })
}

exports.deleteUser = (data, callBack) => {
    pool.query(`DELETE FROM utilisateurs WHERE id = ?`,
    [data], 
    (error, results, fields) => {
        if (error) {
            return callBack(error);
        }
        return callBack(null, results)
    })
}