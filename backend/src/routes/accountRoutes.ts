import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { newAccountController } from '../factory/index';

const router = Router();

router.get('/balance', authMiddleware, newAccountController.getBalance);


export default router;