const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const validateCreateUserInputs = require('../midlewares/checkUser');
const validateToken = require('../midlewares/valideToken');

router.post('/', validateCreateUserInputs.validateCreateUserInputs, userController.createUser);
router.get('/', validateToken.validateToken, userController.getAllUsers);
router.get('/:id', validateToken.validateToken, userController.getUserById);
router.delete('/me', validateToken.validateToken, userController.deleteUser);

module.exports = router;