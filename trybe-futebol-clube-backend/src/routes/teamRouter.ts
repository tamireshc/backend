import { Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';
import TeamRepository from '../repositories/TeamRepository';

const router = Router();

const teamRepositoryInstance = new TeamRepository();
const teamServiceInstance = new TeamService(teamRepositoryInstance);
const teamControllerInstance = new TeamController(teamServiceInstance);

router.get('/', teamControllerInstance.getAllTeams);
router.get('/:id', teamControllerInstance.getTeamById);

export default router;
