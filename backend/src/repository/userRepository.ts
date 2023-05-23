import User from '../database/models/User';
import Account from '../database/models/Account';
import sequelize from '../database/models';
import { IUserRepository, IUserLogin, IUser, IUserReturn } from '../interfaces/userInterfaces';
import createToken from '../helpers/jwtCreate';

export default class UserRepository implements IUserRepository {
  userLogin = async ({ username }: IUserLogin): Promise<IUser | null> => {
    const user = await User.findOne({ where: { username } });
    return user
  }

  userRegister = async ({ username, password }: IUserLogin): Promise<IUser | undefined> => {
    const t = await sequelize.transaction({ autocommit: false });
    try {
      const { id } = await Account.create({ balance: 100 }, { transaction: t });
      const user: IUser = await User.create(
        { username, password, accountId: id },
        { transaction: t },
      );
      
      await t.commit();

      return user as IUser;
    } catch (error) {
      await t.rollback();
    }
  }
}
