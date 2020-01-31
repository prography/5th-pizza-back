import { Router } from 'express';
import JobController from '../controllers/JobController';

const router = Router();

router.patch('/daily-check', JobController.runDailyJob)

export default router;
