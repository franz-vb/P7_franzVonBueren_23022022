const { createPost, getPosts, getLikes, addLike, deleteLike, isLiked, deletePost } = require('../Controllers/postControllers');

const router = require('express').Router();
const { checkToken, checkTokenS } = require('../../config/tokenAuth');
const multer = require('multer');
const path = require('path');

/* Stocker et nommer les images */
const storage = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_groupomania_${path.extname(file.originalname)}`);
    }
})

/* Filtres format images */ 
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Only jpeg and png files are allowed'), false);	
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
})

/* ROUTER POST */ 
router.post('/createPost', checkToken, upload.single('postImg'), checkTokenS, createPost);
router.post('/getLikes', checkToken, getLikes);
router.put('/addLike', checkToken, addLike);
router.put('/deleteLike', checkToken, deleteLike);
router.get('/', checkToken, getPosts);
router.delete('/deletePost', checkTokenS, deletePost);

module.exports = router;  