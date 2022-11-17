import * as bcrypt from 'bcryptjs';
import { IUserService, IUserLogin} from '../interfaces/userInterfaces';
import createToken from '../helpers/jwtCreate';
import User from '../database/models/User';
import userLoginValidate from '../validations/userLoginValidate';

export default class UserService implements IUserService<string | null> {
  userLogin = async ({ username, password }: IUserLogin): Promise<string | null> => {
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
}
