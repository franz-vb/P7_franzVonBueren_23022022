const { createComment, getCommentsByPost, deleteComment } = require('../Services/commentService');

exports.createComment = (req, res) => {
    const body = req.body;

    createComment(body, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        if (!results) {
            return res.status(404).json({
                success: 0,
                message: "Creation comment failed"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'created successfully'
        })
    })
}

exports.deleteComment = (req, res) => {
    const body = req.body;

    deleteComment(body, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        if (!results) {
            return res.status(404).json({
                success: 0,
                message: "Delete comment failed"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'Delete comment successfully',
        })
    })
}

exports.getCommentsByPost = (req, res) => {
    const postId = req.params.id;

    getCommentsByPost(postId, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        if (!results) {
            return res.status(404).json({
                success: 0,
                message: "No comments found"
            })
        }
        return res.status(200).json({
            success: 1,
            comments: results
        })
    })
}