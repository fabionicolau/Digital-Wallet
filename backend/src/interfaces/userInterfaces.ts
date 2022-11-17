export interface IUser  {
  id?: number;
  username: string;
  password: string;
  accountId: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserPayload {
  id: number;
  username: string;
  accountId: string;
}

export interface IUserService<T> {
  userLogin(user: IUserLogin): Promise<T>;
}
