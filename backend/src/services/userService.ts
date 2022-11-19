import * as bcrypt from 'bcryptjs';
import { IUserService, IUserLogin, IUserReturn } from '../interfaces/userInterfaces';
import createToken from '../helpers/jwtCreate';
import User from '../database/models/User';
import Account from '../database/models/Account';
import userLoginValidate from '../validations/userLoginValidate';
import sequelize from '../database/models';
import isUsernameAlreadyExists from '../validations/isUsernameExists';

export default class UserService implements IUserService {
  userLogin = async ({ username, password }: IUserLogin): Promise<IUserReturn | null> => {
    userLoginValidate({ username, password });

    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error('Incorrect username or password');
      error.name = 'unauthorized';
      throw error;
    }

    const token = createToken(user);

    return { 
      id: user.id,
      username: user.username,
      accountId: user.accountId,
      token, 
    } as IUserReturn;
  };

  userRegister = async ({ username, password }: IUserLogin): Promise<IUserReturn | undefined > => {
    userLoginValidate({ username, password });
    await isUsernameAlreadyExists(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const t = await sequelize.transaction();
    try {
      const { id } = await Account.create({ balance: 100 }, { transaction: t });
      const user = await User.create(
        { username, password: hashedPassword, accountId: id },
        { transaction: t },
      );
      
      await t.commit();
      
      const token = createToken(user);

      return { 
        id: user.id,
        username: user.username,
        accountId: user.accountId,
        token, 
      } as IUserReturn;    
    } catch (error) {
      await t.rollback();
    }
  };
}
