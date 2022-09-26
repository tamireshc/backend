const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');
const validateToken = require('../midlewares/valideToken');
const validatePostInputs = require('../midlewares/checkPost');
const validateEditPostInputs = require('../midlewares/ckeckEditPost');

router.get('/', validateToken.validateToken, postController.getAllPostWithCategoriesAndUser);
router.put('/:id', validateToken.validateToken, 
validateEditPostInputs.validateEditPostInputs, postController.updatePost);
router.delete('/:id', validateToken.validateToken, postController.deletePost);
router.get('/search', validateToken.validateToken, postController.getPostByTerm);
router.get('/:id', validateToken.validateToken, postController.getPostByIdWithCategoriesAndUser);
router.post('/', validateToken.validateToken,
 validatePostInputs.validatePostInputs, postController.insertPost);

module.exports = router;