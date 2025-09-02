const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

async function deleteComment(req, res) {
    try {
        const deleted = await db.deleteComment(parseInt(req.params.commentId));
        return res.status(204).end();
    }catch(error) {
        console.error(error);
        return res.status(500).json({ errorMessage: "Could not delete comment" });
    }
};

const validateUser = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage("Content cannot be empty"),
];

const createComment = [
    validateUser,

    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const { content } = req.body;
            const userId = parseInt(req.user.id);
            const postId = parseInt(req.params.postId);
            const comment = await db.createComment(content, userId, postId);
            return res.status(201).json({
                message: 'Your comment has been created',
                comment
            });
        }catch(error) {
            console.error(error);
            return res.status(500).json({ errorMessage: "something went wrong during comment creation" });

        }
    }
];

module.exports = {
    deleteComment,
    createComment
};

