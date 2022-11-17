import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { newTransactionController } from '../factory/index';

const router = Router();

router.post('/transaction', authMiddleware, newTransactionController.createTransaction);

export default router;