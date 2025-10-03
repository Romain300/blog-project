const { Router } = require('express');
const { createComment, deleteComment } = require('../controllers/commentController');
const passport = require('passport');

const router = Router();
router.delete('/:commentId', passport.authenticate('jwt', { session: false }), deleteComment);
router.post('/:postId', passport.authenticate('jwt', { session: false }), createComment)

module.exports = router;


