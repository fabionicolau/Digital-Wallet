import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { newUserController } from '../factory/index';

const router = Router();

router.post('/login', newUserController.userLogin);

export default router;
