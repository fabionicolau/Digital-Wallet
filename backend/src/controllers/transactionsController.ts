import { Request, Response } from 'express';
import errorHandler from '../middlewares/errorHandler';
import { ITransactionService } from '../interfaces/transactionsInterfaces';

export default class TransactionController {
  constructor(private transactionService: ITransactionService) { }

  createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { accountId: debitedAccountId } = req.body.jwtInfos;
      const { username, value } = req.body;
      const message = await this.transactionService.createTransaction({ debitedAccountId, username, value });

      res.status(201).json(message);
    } catch (error) {
      errorHandler(error as Error, req, res);
    }
  }
}
