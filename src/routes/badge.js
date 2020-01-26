import { Router } from 'express';
import BadgeController from '../controllers/BadgeController';

const router = Router();

router.get('', BadgeController.getBadges)

export default router;
