import * as bcrypt from 'bcryptjs';
import { IUserService, IUserLogin} from '../interfaces/userInterfaces';
import createToken from '../helpers/jwtCreate';
import User from '../database/models/User';
import Account from '../database/models/Account';
import userLoginValidate from '../validations/userLoginValidate';
import sequelize from '../database/models';
 

export default class UserService implements IUserService<string | null > {
  userLogin = async ({ username, password }: IUserLogin): Promise<string | null > => {
    userLoginValidate({ username, password });

    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error('Incorrect username or password');
      error.name = 'unauthorized';
      throw error;
    }

    const token = createToken(user);

    return token;
  };

  userRegister = async ({ username, password }: IUserLogin): Promise<string | undefined > => {
      userLoginValidate({ username, password });
      const isUsernameExists = await User.findOne({ where: { username } });

      if (isUsernameExists) {
        const error = new Error('Username already exists');
        error.name = 'conflict';
        throw error;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const t = await sequelize.transaction();
      try {
      const { id } = await Account.create({ balance: 100 }, { transaction: t });
      const user = await User.create({ username, password: hashedPassword, accountId: id }, { transaction: t });
      
      await t.commit();
      
      const token = createToken(user);
      return token;    
      } catch (error) {
        await t.rollback();
      }
  };
}
