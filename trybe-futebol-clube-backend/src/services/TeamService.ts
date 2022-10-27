import TeamRepository from '../repositories/TeamRepository';
import { ITeam } from '../entities/ITeam';

export default class TeamService {
  private _teamRepository: TeamRepository;
  static allTeams: ITeam[];

  constructor(teamRepository: TeamRepository) {
    this._teamRepository = teamRepository;
    this.getAllTeams();
  }

  public getAllTeams = async (): Promise<ITeam[]> => {
    const teams = await this._teamRepository.getAllTeams();
    return teams;
  };

  public getTeamById = async (id: number): Promise<ITeam | null> => {
    const team = await this._teamRepository.getTeamById(id);
    return team;
  };
}
