import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public createCar = async (car: ICar) => {
    const carODM = new CarODM();
    if (!car.status) {
      const newCar = await carODM.create({ ...car, status: false });
      return this.createCarDomain(newCar);
    }
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  };

  public findAllCars = async () => {
    const carODM = new CarODM();
    const cars = await carODM.find();
    const ajustCarId = cars.map((item) => ({
      id: item._id,
      model: item.model,
      year: item.year,
      color: item.color,
      status: item.status,
      buyValue: item.buyValue,
      doorsQty: item.doorsQty,
      seatsQty: item.seatsQty,
    }));
    return ajustCarId;
  };

  public findCarById = async (id: string) => {
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    if (car) {
      const ajustCarId = {
        id: car._id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      };
      return ajustCarId;
    }
    return null;
  };

  public updateCar = async (id: string, car: ICar) => {
    const carODM = new CarODM();

    const carUpdated = await carODM.update(id, car);
    if (carUpdated) {
      const ajustCarId = {
        id: carUpdated._id,
        model: carUpdated.model,
        year: carUpdated.year,
        color: carUpdated.color,
        status: carUpdated.status,
        buyValue: carUpdated.buyValue,
        doorsQty: carUpdated.doorsQty,
        seatsQty: carUpdated.seatsQty,
      };
      return ajustCarId;
    }
  };

  public deleteCarById = async (id: string) => {
    const carODM = new CarODM();
    const hasCar = await this.findCarById(id);
    if (!hasCar) {
      return { message: 'Car not found' };
    }
    await carODM.delete(id);
    return null;
  };
}

export default CarService;
