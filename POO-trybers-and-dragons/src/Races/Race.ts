export default abstract class Race {
  readonly name: string;
  readonly dexterity: number;

  constructor(_name: string, _dexterity: number) {
    this.name = _name;
    this.dexterity = _dexterity;
  }

  static createdRacesInstances(): number {
    throw new Error('Not implemented');
  }

  abstract get maxLifePoints(): number;
}