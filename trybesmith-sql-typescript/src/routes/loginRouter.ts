import { Router } from 'express';
import loginController from '../controllers/loginController';
import userMiddleware from '../middlewares/validateLogin';

const router = Router();

router.post('/', userMiddleware.userMiddleware, loginController.login);

export default router;