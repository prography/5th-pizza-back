import { Router } from 'express';
import { getRanking } from '../controllers/RankingController';

const router = Router();

router.get('/challenge/:challengeId', getRanking);

export default router;
