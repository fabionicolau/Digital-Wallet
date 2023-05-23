import { IAccountRepository, IAccountService, IUserBalance } from '../interfaces/accountInterfaces';

export default class AccountService implements IAccountService {
  constructor (private accountRepository: IAccountRepository) {}
  getBalance = async (id: number): Promise<IUserBalance> => {
    const user = await this.accountRepository.getBalance(id);
  
    if (!user) {
      const error = new Error('Conta não encontrada');
      error.name = 'notFound';
      throw error;
    }

    return { username: user.username, balance: user.userAccount.balance };
  };
}