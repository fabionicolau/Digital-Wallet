export interface IAccount {
  id?: number;
  balance: number;
}

export interface IUserAccount {
  username: string;
  account: {
    balance: number;
  };
}

export interface IAccountService<T> {
  getBalance(accountId: number): Promise<T>;
}