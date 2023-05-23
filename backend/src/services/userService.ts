import * as bcrypt from 'bcryptjs';
import { IUserService, IUserLogin, IUserReturn, IUserRepository } from '../interfaces/userInterfaces';
import createToken from '../helpers/jwtCreate';
import userLoginValidate from '../validations/userLoginValidate';
import isUsernameAlreadyExists from '../validations/isUsernameExists';

export default class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) { }
  userLogin = async ({ username, password }: IUserLogin): Promise<IUserReturn | null> => {
    userLoginValidate({ username, password });

    const user = await this.userRepository.userLogin({ username, password });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error('usuário ou senha inválidos');
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
   
    const user = await this.userRepository.userRegister({ username, password: hashedPassword });
    if (!user) {
      const error = new Error('não foi possível criar o usuário');
      error.name = 'validationError';
      throw error;
    }

    const token = createToken(user);
  
    return { 
      id: user.id,
      username: user.username,
      accountId: user.accountId,
      token, 
    } as IUserReturn;    
  }
}
