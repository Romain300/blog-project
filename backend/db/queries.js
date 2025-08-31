const prisma = require('./client');

async function createUser(name, email, password) {
    try {
        return await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
    }catch(error) {
        throw error;
    }
};

async function getUserByEmail(email) {
    try {
        return await prisma.user.findFirst({
            where: {
                email: email,
            }
        })
    }catch(error) {
        throw error;
    }
};

async function createPost(title, content, published) {
    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                published,
            }
        });
        return newPost;

    }catch(error) {
        throw error;
    }
};

async function getAllPosts() {
    try {
        const posts = await prisma.post.findMany();
        return posts;
    }catch(error) {
        throw error;
    }
};

async function getPostById(postId) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                comments: {
                    include: {
                        author: true
                    }
                }
            }
        });
        return post;
    }catch(error) {
        throw error;
    }
};

async function deletePost(postId) {
    try {
        return await prisma.post.delete({
            where: {
                id: postId,
            }
        })
    }catch(error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getUserByEmail,
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
};




// review createPost for date and published