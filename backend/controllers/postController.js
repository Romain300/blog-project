const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

async function getAllPosts(req, res) {
    try {
        const posts = await db.getAllPosts();
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: "Something went wrong" });
    }
};

async function getPostById(req, res) {
    try {
        const post = await db.getPostById(parseInt(req.params.postId));
        return res.status(200).json({ 
            title: post.title,
            content: post.content,
            uploadAt: post.uploadAt
         });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: "Something went wrong" });
    }
};

async function deletePost(req, res) {
    try {
        const deletedPost = await db.deletePost(parseInt(req.params.postId));
        return res.status(204).end();
    }catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Could not delete post" });
    }
};

const validateUser = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty'),
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content cannot be empty'),
];

const createPost = [
    validateUser,

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content } = req.body;
        const published = req.body.published ? true : false;
        try {
            console.log("creating post...");
            const newPost = await db.createPost(title, content, published);
            console.log('new post created');
            return res.status(201).json({
                message: 'Your post has been created',
                newPost
            });
        }catch (error) {
            console.log(error);
            return res.status(500).json({ errorMessage: 'something went wrong during user creation' });
        }

    }
];


module.exports = {
    getAllPosts,
    getPostById,
    deletePost,
    createPost
};