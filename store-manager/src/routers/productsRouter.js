const express = require('express');
const productController = require('../controllers/productsController');
const validadeName = require('../middlewares/validadeName');

const router = express.Router();

router.get('/', productController.listAllProducts);

router.get('/search', productController.findProductByTerm);

router.get('/:id', productController.findProductById);

router.post('/', validadeName, productController.createProduct);

router.put('/:id', validadeName, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;