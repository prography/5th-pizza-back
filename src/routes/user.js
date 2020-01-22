import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.delete('/:user_id', UserController.deleteUser)

export default router;
