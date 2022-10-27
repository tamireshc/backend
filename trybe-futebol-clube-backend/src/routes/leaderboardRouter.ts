import { Router } from 'express';
import MatchRepository from '../repositories/MatchRepository';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchRepositoryInstance = new MatchRepository();
const matchServiceInstance = new MatchService(matchRepositoryInstance);
const matchControllerInstance = new MatchController(matchServiceInstance);

router.get('/home', matchControllerInstance.orderHomeMatchLeaderboards);
router.get('/away', matchControllerInstance.orderAwayMatchLeaderboards);
router.get('/', matchControllerInstance.orderMatchLeaderboards);

export default router;
