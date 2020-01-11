const { Router } = require('express');
const BadgeController = require('../controllers/BadgeController');

const router = Router();

router.get('', BadgeController.getBadges)
router.post('', BadgeController.createBadge)

module.exports = router;