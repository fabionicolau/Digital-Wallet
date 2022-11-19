import { Request, Response } from 'express';
import errorHandler from '../middlewares/errorHandler';
import { IAccountService } from '../interfaces/accountInterfaces';

export default class AccountController {
  constructor(private accountService: IAccountService) { }

  getBalance = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.body.jwtInfos;
      const balance = await this.accountService.getBalance(id);

      res.status(200).json(balance);
    } catch (error) {
      errorHandler(error as Error, req, res);
    }
  };
}