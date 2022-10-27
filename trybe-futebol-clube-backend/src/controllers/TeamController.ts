import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: TeamService) {
  }

  public getAllTeams = async (req: Request, res: Response) => {
    try {
      const teams = await this.teamService.getAllTeams();
      res.status(200).json(teams);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const team = await this.teamService.getTeamById(Number(id));
      res.status(200).json(team);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  };
}
