import { Router } from 'express';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';
import LoginController from '../controllers/LoginController';
import checkLogin from '../middlewares/checkLogin';

const router = Router();

const userRepositoryInstance = new UserRepository();
const userServicesInstance = new UserService(userRepositoryInstance);
const loginControllerInstance = new LoginController(userServicesInstance);

router.post('/', checkLogin, loginControllerInstance.login);
router.get('/validate', loginControllerInstance.logiValidateRoute);

export default router;
