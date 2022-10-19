import Race from './Race';

export default class Elf extends Race {
  readonly name: string;
  readonly dexterity: number;
  _maxLifePoints: number;
  static InstancesOfDwarf = 0;

  constructor(_name: string, _dexterity: number) {
    super(_name, _dexterity);
    this.name = _name;
    this.dexterity = _dexterity;
    this._maxLifePoints = 99;
    Elf.InstancesOfDwarf += 1;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static createdRacesInstances(): number {
    return Elf.InstancesOfDwarf;
  }
}