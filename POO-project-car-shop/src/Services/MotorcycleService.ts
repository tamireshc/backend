import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcyclesDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public createMotorcycle = async (motorcycle: IMotorcycle) => {
    const motorcycleODM = new MotorcycleODM();
    if (!motorcycle.status) {
      const newMotorcycle = await motorcycleODM.create({ ...motorcycle, status: false });
      return this.createMotorcyclesDomain(newMotorcycle);
    }
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    const motorcycleObj = this.createMotorcyclesDomain(newMotorcycle);
    return motorcycleObj;
  };

  public findAllMotorcycle = async () => {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.find();
    const ajustMotorcycleId = motorcycles.map((item) => ({
      id: item._id,
      model: item.model,
      year: item.year,
      color: item.color,
      status: item.status,
      buyValue: item.buyValue,
      category: item.category,
      engineCapacity: item.engineCapacity,
    }));
    return ajustMotorcycleId;
  };

  public findMotorcycleById = async (id: string) => {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    if (motorcycle) {
      const ajustMotorcycleId = {
        id: motorcycle._id,
        model: motorcycle.model,
        year: motorcycle.year,
        color: motorcycle.color,
        status: motorcycle.status,
        buyValue: motorcycle.buyValue,
        category: motorcycle.category,
        engineCapacity: motorcycle.engineCapacity,
      };
      return ajustMotorcycleId;
    }
    return null;
  };

  public updateMotorcycle = async (id: string, motorcycle: IMotorcycle) => {
    const motorcycleODM = new MotorcycleODM();
    const carUpdated = await motorcycleODM.update(id, motorcycle);
    if (carUpdated) {
      const ajustMotorcycleId = {
        id: carUpdated._id,
        model: carUpdated.model,
        year: carUpdated.year,
        color: carUpdated.color,
        status: carUpdated.status,
        buyValue: carUpdated.buyValue,
        category: carUpdated.category,
        engineCapacity: carUpdated.engineCapacity,
      };
      return ajustMotorcycleId;
    }
  };

  public deleteMotorcycleById = async (id: string) => {
    const motorcycleODM = new MotorcycleODM();
    const hasMotorcycle = await this.findMotorcycleById(id);
    if (!hasMotorcycle) {
      return { message: 'Motorcycle not found' };
    }
    await motorcycleODM.delete(id);
    return null;
  };
}

export default MotorcycleService;