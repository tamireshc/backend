import { ITeam } from './ITeam';

export interface ITeamRepository {
  getAllTeams(): Promise<ITeam[]>
  getTeamById(id: number): Promise<ITeam | null>

}
