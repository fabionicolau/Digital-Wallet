export interface IUser {
  id?: number;
  username: string;
  password: string;
  accountId: number;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserPayload {
  id: number;
  username: string;
  accountId: number;
}

export interface IUserReturn {
  id: number;
  username: string;
  accountId: number;
  token: string;
}

export interface IUserRepository {
  userLogin(user: IUserLogin): Promise<IUser | null>;
  userRegister({ username, password }: IUserLogin): Promise<IUser | undefined >;
}

export interface IUserService {
  userLogin(user: IUserLogin): Promise<IUserReturn | null>;
  userRegister(user: IUserLogin): Promise<IUserReturn | undefined>;
}
