export interface ITransaction {
  id?: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt?: Date;
}

export interface ITransactionBody {
  debitedAccountId: number;
  username: string;
  value: number; 
}

export interface ITransactionService {
  createTransaction(transaction: ITransactionBody): Promise<ITransaction | undefined>;
  // getTransactions(accountId: number): Promise<T>;
}