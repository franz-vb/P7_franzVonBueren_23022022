const pool = require('../../config/database');

exports.createPost = (data, callback) => {
    pool.query(`INSERT INTO posts(idUser, pseudo, date, message, image) 
    values(?,?,?,?,?)`,
        [
            data.userId,
            data.pseudo,
            data.date,
            data.message,
            data.filename
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        }
    )
}

exports.deletePost = (data, callback) => {
    pool.query(`DELETE FROM posts WHERE ID = ?; DELETE FROM likes WHERE postId = ?; DELETE FROM comments WHERE postId = ?`,
    [data, data, data], 
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        }
    )
}

exports.getLikes = (data, callback) => {
    pool.query(`SELECT postId FROM likes WHERE userId = ?`,
        [data], 
        (error, results, fields) => {
            if (error) {
                return callback(error)
            };
            
            return callback(null, results)
        }
    )
}

exports.isLiked = (data, callback) => {
    pool.query(`SELECT * FROM likes WHERE postId = ? AND userId = ?`,
    [data.postId, data.uuid],
        (error, results, fields) => {

            if (error) {
                return callback(error)
            };

            if (results.length > 0) {
                return callback(null, false)
            } else {
                return callback(null, true)
            }
        })
}

/* exports.updateLike = (data, callback) => {
    pool.query(`UPDATE posts SET Likes = ? WHERE ID = ?`, 
    [data.likes, data.postId], 
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        }
    )
} */

exports.deleteLike = (data, callback) => {

    const likeId = data.uuid.toString() + data.postId.toString();
    pool.query(`DELETE FROM likes WHERE Id = ?; UPDATE posts SET Likes = ? WHERE ID = ?`,
    [likeId, data.likes, data.postId], 
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        }
    )
}
exports.addLike = (data, callback) => {
    const likeId = data.uuid.toString() + data.postId.toString();
    pool.query(`INSERT INTO likes(postId, userId, Id) VALUES(?,?,?); UPDATE posts SET Likes = ? WHERE ID = ?`,
    [data.postId, data.uuid, likeId, data.likes, data.postId],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        }
    )
}


exports.getPosts = (callback) => {
    pool.query(`SELECT idUser, pseudo, date, message, likes, comments, ID, image FROM posts`,
    [], (error, results, fields) => {
        if (error) {
            return callback(error); 
        }
        return callback(null, results);
    })
}