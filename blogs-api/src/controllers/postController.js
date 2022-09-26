const postService = require('../services/postService');

const getAllPostWithCategoriesAndUser = async (req, res) => {
    try {
        const { message } = await postService.getAllPostWithCategoriesAndUser();
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getPostByIdWithCategoriesAndUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { type, message } = await postService.getPostByIdWithCategoriesAndUser(Number(id));
        if (type) {
            return res.status(404).json({ message });
        }
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const email = req.user;

    try {
        const { type, message } = await postService.deletePost(Number(id), email);
        if (type === 'NOT_FOUND') {
            return res.status(404).json({ message });
        }
        if (type === 'USER_ERROR') {
            return res.status(401).json({ message });
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getPostByTerm = async (req, res) => {
    const { q } = req.query;

    try {
        const { message } = await postService.getPostByTerm(q);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const insertPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const email = req.user;
    try {
        const { type, message } = await postService.insertPost(title, content, categoryIds, email);
        if (type) {
            return res.status(400).json({ message });
        }
        return res.status(201).json(message);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const email = req.user;
    try {
        const { type, message } = await postService.updatePost(title, content, email, id);
        if (type) {
            return res.status(401).json({ message });
        }
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    getAllPostWithCategoriesAndUser,
    getPostByIdWithCategoriesAndUser,
    deletePost,
    getPostByTerm,
    insertPost,
    updatePost,
};