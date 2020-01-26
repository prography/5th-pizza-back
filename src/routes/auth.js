import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/login/:type', AuthController.login)

export default router;
