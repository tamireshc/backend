import { Ileaderboard } from '../entities/IMatch';

export const compareTotalPoint = (a: Ileaderboard, b: Ileaderboard): number => {
  if (a.totalPoints > b.totalPoints) {
    return -1;
  }
  if (a.totalPoints < b.totalPoints) {
    return 1;
  }
  return 0;
};

export const compareTotalVictories = (a: Ileaderboard, b: Ileaderboard): number => {
  if (a.totalPoints === b.totalPoints && a.totalVictories > b.totalVictories) {
    return -1;
  }
  if (a.totalPoints === b.totalPoints && a.totalVictories < b.totalVictories) {
    return 1;
  }
  return 0;
};

export const compareGoalsBalance = (a: Ileaderboard, b: Ileaderboard): number => {
  if (a.totalPoints === b.totalPoints && a.totalVictories === b.totalVictories
    && a.goalsBalance > b.goalsBalance) {
    return -1;
  }
  if (a.totalPoints === b.totalPoints && a.totalVictories === b.totalVictories
    && a.goalsBalance < b.goalsBalance) {
    return 1;
  }
  return 0;
};

export const compareGoalsFavor = (a: Ileaderboard, b: Ileaderboard): number => {
  if (a.totalPoints === b.totalPoints && a.totalVictories === b.totalVictories
    && a.goalsBalance === b.goalsBalance && a.goalsFavor > b.goalsFavor) {
    return -1;
  }
  if (a.totalPoints === b.totalPoints && a.totalVictories === b.totalVictories
    && a.goalsBalance === b.goalsBalance && a.goalsFavor < b.goalsFavor) {
    return 1;
  }
  return 0;
};
