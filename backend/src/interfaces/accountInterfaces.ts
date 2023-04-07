export interface IAccount {
  id?: number;
  balance: number;
}

export interface IUserAccount {
  id?: number;
  username: string;
  password: string;
  accountId: number;
  userAccount: IAccount;
}

export interface IUserBalance {
  username: string;
  balance: number;
}

export interface IAccountService {
  getBalance(id: number): Promise<IUserBalance>;
}