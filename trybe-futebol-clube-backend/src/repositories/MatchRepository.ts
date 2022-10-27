import Teams from '../database/models/Team';
import { IMatchRepository } from '../entities/IMatchRepository';
import { IMatch, IMatchAway, IMatchForCreate, IMatchHome } from '../entities/IMatch';
import MatchModel from '../database/models/Match';

export default class MatchRepository implements IMatchRepository {
  private matchModel = MatchModel;

  public getAllMatches = async (inProgress: number): Promise<IMatch[]> => {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches as unknown as IMatch[];
  };

  public getAllMatchesInProgressNull = async (): Promise<IMatch[]> => {
    const matches = await this.matchModel.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches as unknown as IMatch[];
  };

  public createMatch = async (match: IMatchForCreate): Promise<IMatchForCreate> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const newMatch = await this.matchModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return newMatch;
  };

  public editStatusInProgressToFalse = async (id: number): Promise<object> => {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };

  public editMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { message: 'edited' };
  };

  public orderHomeMatchLeaderboards = async (): Promise<IMatchHome[]> => {
    const result = await this.matchModel.findAll({
      where: { inProgress: 0 },
      order: [
        ['homeTeam', 'ASC']],
      attributes: { exclude: ['inProgress', 'id'] },
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }],
    });
    return result as unknown as IMatchHome[];
  };

  public orderAwayMatchLeaderboards = async (): Promise<IMatchAway[]> => {
    const result = await this.matchModel.findAll({
      where: { inProgress: 0 },
      order: [
        ['awayTeam', 'ASC']],
      attributes: { exclude: ['inProgress', 'id'] },
      include: [{
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return result as unknown as IMatchAway[];
  };
}
