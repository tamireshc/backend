import IMotorcycles from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: 'Street' | 'Custom' | 'Trail';
  private engineCapacity: number;

  constructor({
    _id,
    model,
    year,
    color,
    status,
    buyValue,
    category,
    engineCapacity }: IMotorcycles) {
    super(
      _id,
      model,
      year,
      color,
      status,
      buyValue,
    );
    this.category = category;
    this.engineCapacity = engineCapacity;
  }
  public getCategory() {
    return this.category;
  }
  public setCategory(value: 'Street' | 'Custom' | 'Trail') {
    this.category = value;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }

  public setEngineCapacity(value: number) {
    this.engineCapacity = value;
  }
}

export default Motorcycle;