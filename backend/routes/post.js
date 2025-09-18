const { Router } = require('express');
const { getAllPosts, getPostById, deletePost, createPost, updatePost, updatePublishedStatus } = require('../controllers/postController');
const passport = require('passport');

const router = Router();
router.get('/', getAllPosts);
router.post('/', passport.authenticate('jwt', { session: false }), createPost);
router.get('/:postId', getPostById);
router.delete('/:postId', deletePost);
router.put('/:postId', updatePost);
router.put('/:postId/updateStatus', updatePublishedStatus);

module.exports = router;

