import { Router } from 'express';
import userController from '../controllers/userController';
import userMiddleware from '../middlewares/validateUser';

const router = Router();

router.post('/', userMiddleware.userMiddleware, userController.createUser);

export default router;