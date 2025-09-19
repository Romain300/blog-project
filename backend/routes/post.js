const { Router } = require('express');
const { getAllPosts, getPostById, deletePost, createPost, updatePost, updatePublishedStatus } = require('../controllers/postController');
const passport = require('passport');

const router = Router();
router.get('/', getAllPosts);
router.post('/', passport.authenticate('jwt', { session: false }), createPost);
router.get('/:postId', getPostById);
router.delete('/:postId', passport.authenticate('jwt', { session: false }), deletePost);
router.put('/:postId', passport.authenticate('jwt', { session: false }), updatePost);
router.put('/:postId/updateStatus', passport.authenticate('jwt', { session: false }), updatePublishedStatus);

module.exports = router;

