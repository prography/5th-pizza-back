const { Router } = require('express');
const ChallengeController = require('../controllers/ChallengeController')

const router = Router();

router.get('', ChallengeController.getChallenges)
router.get('/:challenge', ChallengeController.getChallenge)
router.post('', ChallengeController.createChallenge)
router.delete('/:challenge', ChallengeController.deleteChallenge)

module.exports = router;