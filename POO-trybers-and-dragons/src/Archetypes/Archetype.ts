import { EnergyType } from '../Energy';

export default abstract class Archetype {
  readonly name: string;
  readonly special: number;
  readonly cost: number;
  constructor(_name: string) {
    this.name = _name;
    this.special = 0;
    this.cost = 0;
  }

  static createdArchetypeInstances(): number {
    throw new Error('Not implemented');
  }

  abstract get energyType(): EnergyType;
}