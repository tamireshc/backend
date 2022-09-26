const express = require('express');

const router = express.Router();

const validateLoginInputs = require('../midlewares/checkLogin');
const userController = require('../controllers/userController');

router.post('/', validateLoginInputs.validateLoginInputs, userController.checkUser);

module.exports = router;
