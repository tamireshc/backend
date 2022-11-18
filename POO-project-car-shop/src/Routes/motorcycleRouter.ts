import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import MotorcycleService from '../Services/MotorcycleService';

const router = Router();

const motorcycleServiceInstance = new MotorcycleService();
const motorcycleControllerInstance = new MotorcycleController(motorcycleServiceInstance);

router.post('/', motorcycleControllerInstance.createMotorcycle);
router.get('/', motorcycleControllerInstance.findAllMotorcycle);
router.get('/:id', motorcycleControllerInstance.findMotorcycleById);
router.put('/:id', motorcycleControllerInstance.updateMotorcycle);
router.delete('/:id', motorcycleControllerInstance.deleteMotorcycleById);

export default router;