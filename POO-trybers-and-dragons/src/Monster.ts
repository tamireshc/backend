import SimpleFighter from './Fighter/SimpleFighter';
import Fighter from './Fighter';

export default class Monster implements SimpleFighter {
  protected _lifePoints: number;
  private _strength: number;

  constructor() {
    this._lifePoints = 85;
    this._strength = 63;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  receiveDamage(attackPoints: number): number {
    const damage = this._lifePoints - attackPoints;
    if (damage > 0) {
      this._lifePoints -= damage;
    }
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }

  // receiveAttack(attackPoints: number): number {
  //   return this._lifePoints;
  // }

  attack(_enemy: Fighter): void {
    this.receiveDamage(_enemy.strength);
  }
}