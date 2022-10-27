import chechIfTeamExists from '../utils/checkIdTeamExist';
import MatchRepository from '../repositories/MatchRepository';
import {
  Ileaderboard, IMatch, IMatchAway, IMatchForCreate,
  IMatchForCreateObj, IMatchHome,
} from '../entities/IMatch';
import {
  compareGoalsBalance, compareGoalsFavor, compareTotalPoint,
  compareTotalVictories,
} from '../utils/compareLeaderborad';

export default class MatchService {
  private _matchRepository: MatchRepository;
  private final: Ileaderboard[];
  private allTeams: string[];
  constructor(matchRepository: MatchRepository) {
    this._matchRepository = matchRepository;
    this.final = [];
    this.allTeams = ['Avaí/Kindermann', 'Bahia', 'Botafogo', 'Corinthians', 'Cruzeiro',
      'Ferroviária', 'Flamengo', 'Grêmio',
      'Internacional', 'Minas Brasília', 'Napoli-SC', 'Palmeiras',
      'Real Brasília', 'Santos', 'São José-SP', 'São Paulo'];
  }

  public getAllMatches = async (inProgress: number): Promise<IMatch[]> => {
    const matches = await this._matchRepository.getAllMatches(inProgress);
    return matches;
  };

  public getAllMatchesInProgressNull = async (): Promise<IMatch[]> => {
    const matches = await this._matchRepository.getAllMatchesInProgressNull();
    return matches;
  };

  public createMatch = async (match: IMatchForCreate): Promise<IMatchForCreateObj> => {
    const checkteam = await chechIfTeamExists(match.homeTeam, match.awayTeam);
    if (match.homeTeam === match.awayTeam) {
      return {
        type: 'equal_teams',
        message: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    if (!checkteam) {
      return {
        type: 'no_teams',
        message: { message: 'There is no team with such id!' },
      };
    }
    const newMatch = await this._matchRepository.createMatch(match);
    return { type: null, message: newMatch };
  };

  public editStatusInProgressToFalse = async (id: number): Promise<object> => {
    const result = await this._matchRepository.editStatusInProgressToFalse(id);
    return result;
  };

  public editMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const result = await this._matchRepository.editMatch(id, homeTeamGoals, awayTeamGoals);
    return result;
  };

  public orderHomeMatchLeaderboards = async (): Promise<Ileaderboard[]> => {
    const result = await this._matchRepository.orderHomeMatchLeaderboards() as IMatchHome[];
    for (let i = 1; i <= this.allTeams.length; i += 1) {
      const ob: Ileaderboard | any = {};
      const r = result.filter((item) => item.homeTeam === i);
      ob.name = r[0].teamHome.teamName;
      ob.totalGames = r.length;
      ob.totalVictories = r.filter((item) => item.homeTeamGoals > item.awayTeamGoals).length;
      ob.totalDraws = r.filter((item) => item.homeTeamGoals === item.awayTeamGoals).length;
      ob.totalLosses = r.filter((item) => item.homeTeamGoals < item.awayTeamGoals).length;
      ob.totalPoints = ob.totalVictories * 3 + ob.totalDraws;
      ob.goalsFavor = r.reduce((a, b) => a + b.homeTeamGoals, 0);
      ob.goalsOwn = r.reduce((a, b) => a + b.awayTeamGoals, 0);
      ob.goalsBalance = ob.goalsFavor - ob.goalsOwn;
      ob.efficiency = +(((ob.totalVictories * 3 + ob.totalDraws) / (ob.totalGames * 3)) * 100)
        .toFixed(2);
      this.final.push(ob);
    }
    return this.order(this.final);
  };

  public orderAwayMatchLeaderboards = async (): Promise<Ileaderboard[]> => {
    const result = await this._matchRepository.orderAwayMatchLeaderboards() as IMatchAway[];
    for (let i = 1; i <= this.allTeams.length; i += 1) {
      const ob: Ileaderboard | any = {};
      const r = result.filter((item) => item.awayTeam === i);
      ob.name = r[0].teamAway.teamName;
      ob.totalGames = r.length;
      ob.totalVictories = r.filter((item) => item.awayTeamGoals > item.homeTeamGoals).length;
      ob.totalDraws = r.filter((item) => item.homeTeamGoals === item.awayTeamGoals).length;
      ob.totalLosses = r.filter((item) => item.awayTeamGoals < item.homeTeamGoals).length;
      ob.totalPoints = ob.totalVictories * 3 + ob.totalDraws;
      ob.goalsFavor = r.reduce((a, b) => a + b.awayTeamGoals, 0);
      ob.goalsOwn = r.reduce((a, b) => a + b.homeTeamGoals, 0);
      ob.goalsBalance = ob.goalsFavor - ob.goalsOwn;
      ob.efficiency = +(((ob.totalVictories * 3 + ob.totalDraws) / (ob.totalGames * 3)) * 100)
        .toFixed(2);
      this.final.push(ob);
    }
    return this.order(this.final);
  };

  public orderMatchLeaderboards = async (): Promise<Ileaderboard[]> => {
    const completeLeaderborad = await this.completeLeaderborad();
    for (let i = 0; i < this.allTeams.length; i += 1) {
      const ob: Ileaderboard | any = {};
      const objTeam = completeLeaderborad.filter((item) => item.name === this.allTeams[i]);
      ob.name = this.allTeams[i];
      ob.totalGames = objTeam[0].totalGames + objTeam[1].totalGames;
      ob.totalVictories = objTeam[0].totalVictories + objTeam[1].totalVictories;
      ob.totalDraws = objTeam[0].totalDraws + objTeam[1].totalDraws;
      ob.totalLosses = objTeam[0].totalLosses + objTeam[1].totalLosses;
      ob.totalPoints = objTeam[0].totalPoints + objTeam[1].totalPoints;
      ob.goalsFavor = objTeam[0].goalsFavor + objTeam[1].goalsFavor;
      ob.goalsOwn = objTeam[0].goalsOwn + objTeam[1].goalsOwn;
      ob.goalsBalance = objTeam[0].goalsBalance + objTeam[1].goalsBalance;
      ob.efficiency = +(((ob.totalVictories * 3 + ob.totalDraws) / (ob.totalGames * 3)) * 100)
        .toFixed(2);
      this.final.push(ob);
    }
    return this.order(this.final);
  };

  private completeLeaderborad = async (): Promise<Ileaderboard[]> => {
    const awayLeaderbosrd = await this.orderAwayMatchLeaderboards();
    const homeLeaderbosrd = await this.orderHomeMatchLeaderboards();
    const completeLeaderborad = [...homeLeaderbosrd, ...awayLeaderbosrd];
    return completeLeaderborad;
  };

  public order = (array: Ileaderboard[]): Ileaderboard[] => {
    const result1 = array.sort(compareTotalPoint);
    const result2 = result1.sort(compareTotalVictories);
    const result3 = result2.sort(compareGoalsBalance);
    const result4 = result3.sort(compareGoalsFavor);
    this.final = [];
    return result4;
  };
}
