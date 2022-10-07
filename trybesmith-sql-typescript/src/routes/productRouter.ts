import { Router } from 'express';
import productController from '../controllers/productController';
import procuctMiddleware from '../middlewares/valideteProduct';

const router = Router();

router.post('/', procuctMiddleware.productMiddleware, productController.createProduct);
router.get('/', productController.getAllProducts);

export default router;