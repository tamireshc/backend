import { Router } from 'express';
import orderController from '../controllers/orderController';
import validateToken from '../middlewares/validateToken';
import validateOrder from '../middlewares/validateOrder';

const router = Router();

router.get('/', orderController.getAllOrders);
router.post(
  '/', 
  validateToken.validateToken,
  validateOrder.orderMiddleware,
  orderController.createOrder,
);

export default router;