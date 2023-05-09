import { IAccountRepository } from "../interfaces/accountInterfaces";
import { IUserAccount } from "../interfaces/accountInterfaces";
import Account from "../database/models/Account";
import User from "../database/models/User";

export default class accountRepository implements IAccountRepository {
  getBalance = async (id: number): Promise<IUserAccount | null> => {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Account,
          as: 'userAccount',
          attributes: ['balance'],
        }],
    }) as IUserAccount | null;
    
    return user;
  }
}