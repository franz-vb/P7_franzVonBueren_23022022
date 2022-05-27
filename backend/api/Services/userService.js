const pool = require('../../config/database');

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

            let result = {
                id: results.insertId
            }
            return callback(null, result)
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

    pool.query(`UPDATE utilisateurs SET pseudo = ? WHERE id = ?; UPDATE posts SET pseudo = ? WHERE idUser = ?; UPDATE comments SET pseudo = ? WHERE userId = ?`,
    [
        data.pseudo, 
        data.id,
        data.pseudo, 
        data.id,  
        data.pseudo, 
        data.id
    ],
    (error, results, fields) => {
        if (error) {
            return callback(error);
        }

        return callback(null, results[0])
    })
}
/*; DELETE FROM comments WHERE userId = ?; DELETE FROM likes WHERE userId = ? , data.userId, data.userId */ 

exports.deleteUser = (data, callBack) => {

    let newPseudo = data.pseudo + "(Utilisateur supprimé)";
    pool.query(`DELETE FROM utilisateurs WHERE id = ?; DELETE FROM posts WHERE idUser = ?; UPDATE comments SET pseudo = ? WHERE userId = ?`,
    [data.userId, data.userId, newPseudo, data.userId], 
    (error, results, fields) => {
        if (error) {
            return callBack(error);
        }
        return callBack(null, results)
    })
}

/* exports.countLikesComments = (data, callBack) => {
    pool.query(`SELECT COUNT(*) as nbrLikes FROM likes WHERE userID = ?; SELECT COUNT(*) as nbrComments FROM comments WHERE userId = ?; SELECT likes FROM posts WHERE ID = ?; SELECT comments FROM posts WHERE ID = ?`,
    [data, data],
    (error, results, fields) => {
        if (error) {
            return callBack(error);
        }
    
        return callBack(null, results)
    })
} */

