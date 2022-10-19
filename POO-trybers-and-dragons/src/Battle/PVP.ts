// import Character from '../Character';
import Fighter from '../Fighter';
import getRandomInt from '../utils';
import Battle from './Battle';

export default class PVP extends Battle {
  _characters1: Fighter;
  _characters2: Fighter;
  _damages: number[];

  constructor(_characters1: Fighter, _characters2: Fighter) {
    super(_characters1);
    this._characters1 = _characters1;
    this._characters2 = _characters2;
    this._damages = [30, 40, 50, 60, 70, 80];
  }

  round() {
    this._characters1.receiveDamage(this._damages[getRandomInt(0, 5)]);
    this._characters2.receiveDamage(this._damages[getRandomInt(0, 5)]);
  }

  fight(): number {
    for (let i = 0; i < 100; i += 1) {
      this.round();
      if (this._characters1.lifePoints === -1
        || this._characters2.lifePoints === -1) {
        break;
      }
    }
    const battleResult = super.fight();

    return battleResult;
  }
}
