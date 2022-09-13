const express = require('express');
const salesController = require('../controllers/salesController');
const validadeInsertSale = require('../middlewares/validateInsertSale');

const router = express.Router();

router.get('/', salesController.listAllSales);

router.get('/:id', salesController.findSaleById);

router.post('/', validadeInsertSale, salesController.createSales);

router.put('/:id', validadeInsertSale, salesController.updateSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;