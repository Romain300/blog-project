const { Router } = require('express');
const { getAllPosts, getPostById, deletePost, createPost } = require('../controllers/postController');
const passport = require('passport');

const router = Router();
router.get('/', getAllPosts);
router.post('/', passport.authenticate('jwt', { session: false }), createPost);
router.get('/:postId', getPostById);
router.delete('/:postId', deletePost);

module.exports = router;

