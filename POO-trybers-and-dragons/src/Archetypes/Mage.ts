import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Mage extends Archetype {
  readonly name: string;
  readonly special: number;
  readonly cost: number;
  readonly _energyType: EnergyType;
  static InstancesOfMage = 0;

  constructor(_name: string) {
    super(_name);
    this.name = _name;
    this.special = 0;
    this.cost = 0;
    this._energyType = 'mana';
    Mage.InstancesOfMage += 1;
  }

  static createdArchetypeInstances(): number {
    return Mage.InstancesOfMage;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }
}