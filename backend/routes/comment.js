const { Router } = require('express');
const { createComment, deleteComment } = require('../controllers/commentController');

const router = Router();
router.delete('/commentId', deleteComment);
router.post('/:postId', createComment)

module.exports = router;


