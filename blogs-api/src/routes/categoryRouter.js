const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/categoryController');
const validateCreateCategoryInputs = require('../midlewares/checkCategory');
const validateToken = require('../midlewares/valideToken');

router.post('/', validateToken.validateToken,
    validateCreateCategoryInputs.validateCategoryInputs, categoryController.createNewCategory);
router.get('/', validateToken.validateToken, categoryController.getAllCategories);

module.exports = router;