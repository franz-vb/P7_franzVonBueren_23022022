const { createComment, getCommentsByPost, deleteComment } = require('../Controllers/commentControllers');

const router = require('express').Router();
const { checkToken, checkTokenS } = require('../../config/tokenAuth');

/* ROUTER COMMENTS */ 
router.post('/createComment', checkTokenS, createComment);
router.get('/getCommentsByPost/:id', checkToken, getCommentsByPost);
router.delete('/deleteComment', checkTokenS, deleteComment);

module.exports = router;  