const pool = require('../../config/database');

exports.createComment = (data, callback) => {

    const nbrComments = data.nbrComments + 1;

    pool.query(`INSERT INTO comments(userId, pseudo, date, comment, postId)
    values(?,?,?,?,?); UPDATE posts SET comments = ? WHERE ID = ?`,
        [
            data.userId,
            data.pseudo,
            data.date,
            data.comment,
            data.postId,
            nbrComments,
            data.postId
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        }
    )
}

exports.deleteComment = (data, callback) => {

    const nbrComments = data.nbrComments - 1;

    pool.query(`DELETE FROM comments WHERE Id = ?; UPDATE posts SET comments = ? WHERE ID = ?`,
    [data.commentId, nbrComments, data.postId],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        }
    )
}

exports.getCommentsByPost = (data, callback) => {
    pool.query(`SELECT * FROM comments WHERE postId = ?`,
        [data],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        })
}