import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarService from '../Services/CarService';

const router = Router();

const carServiceInstance = new CarService();
const carControllerInstance = new CarController(carServiceInstance);

router.put('/:id', carControllerInstance.updateCar);
router.post('/', carControllerInstance.createCar);
router.get('/', carControllerInstance.findAllCars);
router.get('/:id', carControllerInstance.findCarById);
router.delete('/:id', carControllerInstance.deleteCarById);

export default router;