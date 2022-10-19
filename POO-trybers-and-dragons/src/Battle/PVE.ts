import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import getRandomInt from '../utils';
import Battle from './Battle';

export default class PVE extends Battle {
  _characters1: Fighter;
  _characters: (SimpleFighter | Fighter | Monster)[];
  _damages: number[];

  constructor(
    _characters1: Fighter,
    _characters: (SimpleFighter | Fighter | Monster)[],
  ) {
    super(_characters1);
    this._characters1 = _characters1;
    this._characters = _characters;
    this._damages = [30, 40, 50, 60, 70, 80];
  }

  round() {
    this._characters1.receiveDamage(this._damages[getRandomInt(0, 5)]);
    this._characters[getRandomInt(0, this._characters.length - 1)]
      .receiveDamage(this._damages[getRandomInt(0, 5)]);

    // this._characters.receiveDamage(this._damages[getRandomInt(0, 5)]);
  }

  teste() {
    for (let i = 0; i < this._characters.length - 1; i += 1) {
      if (this._characters[i].lifePoints === -1) {
        return 'dead';
      }
    }
  }

  fight(): number {
    for (let i = 0; i < 100; i += 1) {
      this.round();
      const resultCharaters = this.teste();
      if (resultCharaters === 'dead'
        || this._characters1.lifePoints === -1) {
        break;
      }
    }
    const battleResult = super.fight();

    return battleResult;
  }
}