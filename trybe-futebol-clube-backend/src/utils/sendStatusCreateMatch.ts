import { IMatchForCreateObj } from '../entities/IMatch';

const sendStatusCreateMatch = (newMatch: IMatchForCreateObj): number => {
  if (newMatch.type === null) {
    return 201;
  }
  if (newMatch.type === 'equal_teams') {
    return 422;
  }
  if (newMatch.type === 'no_teams') {
    return 404;
  }
  return 500;
};

export default sendStatusCreateMatch;
