const { Router } = require('express');
const { getAllPosts, getPostById, deletePost, createPost } = require('../controllers/postController');

const router = Router();
router.get('/', getAllPosts);
router.post('/', createPost);
router.get('/:postId', getPostById);
router.delete('/:postId', deletePost);

module.exports = router;

