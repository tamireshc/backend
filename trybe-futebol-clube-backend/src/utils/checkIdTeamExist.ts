import TeamRepository from '../repositories/TeamRepository';

const teamRepositoryInstance = new TeamRepository();

const chechIfTeamExists = async (homeTeam: number, awayTeam: number): Promise<boolean> => {
  const hasHomeTeam = await teamRepositoryInstance.getTeamById(Number(homeTeam));
  const hasAwayTeam = await teamRepositoryInstance.getTeamById(Number(awayTeam));
  if (hasAwayTeam === null || hasHomeTeam === null) {
    return false;
  }
  return true;
};

export default chechIfTeamExists;
