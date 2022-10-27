import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import sendStatusCreateMatch from '../utils/sendStatusCreateMatch';

export default class MatchController {
  constructor(private matchService: MatchService) {
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const inProgressStatus = req.query.inProgress as string | undefined;
    try {
      if (inProgressStatus) {
        const inProgressStatusValue: number = inProgressStatus === 'false' ? 0 : 1;
        const matches = await this.matchService.getAllMatches(inProgressStatusValue);
        return res.status(200).json(matches);
      }
      const matches = await this.matchService.getAllMatchesInProgressNull();
      return res.status(200).json(matches);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json(error.message);
      }
    }
  };

  public createMatch = async (req: Request, res: Response) => {
    const match = req.body;
    try {
      const newMatch = await this.matchService.createMatch(match);
      const status = sendStatusCreateMatch(newMatch);
      return res.status(status).json(newMatch.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json(error.message);
      }
    }
  };

  public editStatusInProgressToFalse = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this.matchService.editStatusInProgressToFalse(Number(id));
      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json(error.message);
      }
    }
  };

  public editMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
      const result = await this.matchService.editMatch(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json(error.message);
      }
    }
  };

  public orderHomeMatchLeaderboards = async (req: Request, res: Response) => {
    try {
      const result = await this.matchService.orderHomeMatchLeaderboards();
      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json(error.message);
      }
    }
  };

  public orderAwayMatchLeaderboards = async (req: Request, res: Response) => {
    try {
      const result = await this.matchService.orderAwayMatchLeaderboards();
      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json(error.message);
      }
    }
  };

  public orderMatchLeaderboards = async (req: Request, res: Response) => {
    try {
      const result = await this.matchService.orderMatchLeaderboards();
      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json(error.message);
      }
    }
  };
}
