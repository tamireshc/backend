const { Category } = require('../models');

const createNewCategory = async (name) => {
    const hasCategory = await Category.findOne({
        where: { name },
    });
    if (hasCategory) {
        return { type: 'CATEGORY_REGISTERED', message: 'Category already registered' };
    }
    const category = await Category.create({ name });
    return { type: null, message: category };
};

const getAllCategories = async () => {
    const categories = await Category.findAll();
    return { type: null, message: categories };
};

module.exports = {
    createNewCategory,
    getAllCategories,
};