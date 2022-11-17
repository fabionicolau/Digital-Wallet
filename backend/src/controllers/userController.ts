import { Request, Response } from 'express';
import errorHandler from '../middlewares/errorHandler';
import { IUserService } from '../interfaces/userInterfaces';

export default class UserController {
  constructor(private userService: IUserService<string | null>) { }

  userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const token = await this.userService.userLogin({ username, password });

      res.status(200).json({ token });
    } catch (error) {
      errorHandler(error as Error, req, res);
    }
  };

  userRegister = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const token = await this.userService.userRegister({ username, password });

      res.status(201).json({ token });
    } catch (error) {
      errorHandler(error as Error, req, res);
    }
  };
}
