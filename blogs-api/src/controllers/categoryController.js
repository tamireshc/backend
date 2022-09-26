const categoryService = require('../services/categoryService');

const createNewCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const { type, message } = await categoryService.createNewCategory(name);
        if (type) {
            return res.status(400).json(message);
        }
        return res.status(201).json(message);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getAllCategories = async (req, res) => {
    try {
        const { message } = await categoryService.getAllCategories();
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    createNewCategory,
    getAllCategories,
};