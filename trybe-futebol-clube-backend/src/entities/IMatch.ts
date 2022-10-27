export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface IMatchForCreate {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean
}

type teamName = {
  teamName: string
};

export interface IMatchHome {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  teamHome: teamName
}

export interface IMatchAway {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  teamAway: {
    teamName: string,
  }
}

export interface IMatchForCreateObj {
  type: null | string,
  message: object | IMatchForCreate,
}

export interface Ileaderboard {
  name: string,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  totalPoints: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,

}
