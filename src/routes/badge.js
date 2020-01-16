const { Router } = require('express');
const BadgeController = require('../controllers/BadgeController');

const router = Router();

router.get('', BadgeController.getBadges)

module.exports = router;