import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { newTransactionController } from '../factory/index';

const router = Router();

router.post('/transaction', authMiddleware, newTransactionController.createTransaction);
router.get('/transaction', authMiddleware, newTransactionController.getAllTransactions);
router.get('/transaction/search', authMiddleware, newTransactionController.getFilteredTransactions);

export default router;