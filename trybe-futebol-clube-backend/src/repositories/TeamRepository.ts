import { ITeamRepository } from '../entities/ITeamRepository';
import { ITeam } from '../entities/ITeam';
import TeamModel from '../database/models/Team';

export default class TeamRepository implements ITeamRepository {
  private teamModel = TeamModel;

  public getAllTeams = async (): Promise<ITeam[]> => {
    const teams = await this.teamModel.findAll();
    return teams;
  };

  public getTeamById = async (id: number): Promise<ITeam | null> => {
    const team = await this.teamModel.findByPk(id);
    return team;
  };
}
