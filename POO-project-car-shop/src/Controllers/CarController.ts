import { Request, Response } from 'express';
import CarService from '../Services/CarService';

const INVALID_MONGOID_ERROR_MESSAGE = 'Invalid Mongo id';
const INVALID_MONGOID_MESSAGE = 'Invalid mongo id';

class CarController {
  private _CarService: CarService;
  constructor(carService: CarService) {
    this._CarService = carService;
  }

  public createCar = async (req: Request, res: Response) => {
    const car = req.body;
    try {
      const newCar = await this._CarService.createCar(car);
      return res.status(201).json(newCar);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  };

  public findAllCars = async (req: Request, res: Response) => {
    try {
      const cars = await this._CarService.findAllCars();
      return res.status(200).json(cars);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  };

  public findCarById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const car = await this._CarService.findCarById(id);
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      return res.status(200).json(car);
    } catch (error) {
      if ((error as Error).message === INVALID_MONGOID_ERROR_MESSAGE) {
        return res.status(422).json({ message: INVALID_MONGOID_MESSAGE });
      }
      return res.status(500).json((error as Error).message);
    }
  };

  public updateCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = req.body;
    try {
      const carUpdated = await this._CarService.updateCar(id, car);
      if (!carUpdated) {
        return res.status(404).json({ message: 'Car not found' });
      }
      return res.status(200).json(carUpdated);
    } catch (error) {
      if ((error as Error).message === INVALID_MONGOID_ERROR_MESSAGE) {
        return res.status(422).json({ message: INVALID_MONGOID_MESSAGE });
      }
      return res.status(500).json((error as Error).message);
    }
  };

  public deleteCarById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this._CarService.deleteCarById(id);
      if (result) {
        return res.status(404).json(result);
      }
      return res.sendStatus(204);
    } catch (error) {
      if ((error as Error).message === INVALID_MONGOID_ERROR_MESSAGE) {
        return res.status(422).json({ message: INVALID_MONGOID_MESSAGE });
      }
      return res.status(500).json((error as Error).message);
    }
  };
}

export default CarController;