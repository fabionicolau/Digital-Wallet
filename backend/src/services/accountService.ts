import { IAccountService, IUserAccount, IUserBalance } from '../interfaces/accountInterfaces';
import Account from '../database/models/Account';
import User from '../database/models/User';

export default class AccountService implements IAccountService {
  getBalance = async (id: number): Promise<IUserBalance> => {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Account,
          as: 'userAccount',
          attributes: ['balance'],
        }],
    }) as IUserAccount | null;

    if (!user) {
      const error = new Error('Conta não encontrada');
      error.name = 'notFound';
      throw error;
    }

    return { username: user.username, balance: user.userAccount.balance };
  };
}