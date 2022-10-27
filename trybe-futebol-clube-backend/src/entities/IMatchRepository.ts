import { IMatch, IMatchAway, IMatchForCreate, IMatchHome } from './IMatch';

export interface IMatchRepository {
  getAllMatches(query: number | string): Promise<IMatch[]>
  createMatch(match: IMatchForCreate): Promise<IMatchForCreate>
  editStatusInProgressToFalse(id: number): Promise<object>
  getAllMatchesInProgressNull(): Promise<IMatch[]>
  editMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): object
  orderHomeMatchLeaderboards(): Promise<IMatchHome[]>
  orderAwayMatchLeaderboards(): Promise<IMatchAway[]>
}
