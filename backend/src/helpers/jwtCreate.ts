import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';
import { IUser } from '../interfaces/userInterfaces';

const createToken = (user: IUser): string => {
  const jwtConfig: SignOptions = {
    expiresIn: '24h',
    algorithm: 'HS256',
  };

  const jwtSecret: Secret = process.env.JWT_SECRET || 'secret';

  const { id, username, accountId } = user;

  const token = jwt.sign({ id, username, accountId }, jwtSecret, jwtConfig);

  return token;
};

export default createToken;
