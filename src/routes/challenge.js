import { Router } from 'express';
import ChallengeController from '../controllers/ChallengeController';

const router = Router();

router.get('', ChallengeController.getChallenges)
router.get('/:challengeId', ChallengeController.getChallenge)
router.get('/:challengeId/records', ChallengeController.getChallengeRecords)
router.post('', ChallengeController.createChallenge)
router.delete('/:challengeId', ChallengeController.deleteChallenge)

export default router;
