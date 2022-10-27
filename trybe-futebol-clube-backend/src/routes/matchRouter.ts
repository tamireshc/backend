import { Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import checkToken from '../middlewares/checkToken';
import MatchRepository from '../repositories/MatchRepository';

const router = Router();

const matchRepositoryInstance = new MatchRepository();
const matchServiceInstance = new MatchService(matchRepositoryInstance);
const matchControllerInstance = new MatchController(matchServiceInstance);

router.get('/', matchControllerInstance.getAllMatches);
router.post('/', checkToken, matchControllerInstance.createMatch);
router.patch('/:id/finish', matchControllerInstance.editStatusInProgressToFalse);
router.patch('/:id', matchControllerInstance.editMatch);

export default router;
