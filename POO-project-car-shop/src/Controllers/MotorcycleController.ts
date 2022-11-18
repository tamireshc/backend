import { Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

const INVALID_MONGOID_ERROR_MESSAGE = 'Invalid Mongo id';
const INVALID_MONGOID_MESSAGE = 'Invalid mongo id';

class MotorcycleController {
  private motorcycleService: MotorcycleService;
  constructor(motorcycleService: MotorcycleService) {
    this.motorcycleService = motorcycleService;
  }

  public createMotorcycle = async (req: Request, res: Response) => {
    const motorcycle = req.body;
    try {
      const newMotorcycle = await this.motorcycleService.createMotorcycle(motorcycle);
      return res.status(201).json(newMotorcycle);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  };

  public findAllMotorcycle = async (req: Request, res: Response) => {
    try {
      const motorcycles = await this.motorcycleService.findAllMotorcycle();
      return res.status(200).json(motorcycles);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  };

  public findMotorcycleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const motorcycle = await this.motorcycleService.findMotorcycleById(id);
      if (!motorcycle) {
        return res.status(404).json({ message: 'Motorcycle not found' });
      }
      return res.status(200).json(motorcycle);
    } catch (error) {
      if ((error as Error).message === INVALID_MONGOID_ERROR_MESSAGE) {
        return res.status(422).json({ message: INVALID_MONGOID_MESSAGE });
      }
      return res.status(500).json((error as Error).message);
    }
  };

  public updateMotorcycle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const motorcycle = req.body;
    try {
      const motorcycleUpdated = await this.motorcycleService.updateMotorcycle(id, motorcycle);
      if (!motorcycleUpdated) {
        return res.status(404).json({ message: 'Motorcycle not found' });
      }
      return res.status(200).json(motorcycleUpdated);
    } catch (error) {
      if ((error as Error).message === INVALID_MONGOID_ERROR_MESSAGE) {
        return res.status(422).json({ message: INVALID_MONGOID_MESSAGE });
      }
      return res.status(500).json((error as Error).message);
    }
  };

  public deleteMotorcycleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this.motorcycleService.deleteMotorcycleById(id);
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

export default MotorcycleController;