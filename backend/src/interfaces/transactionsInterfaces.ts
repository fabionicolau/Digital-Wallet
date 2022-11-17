export interface ITransaction {
  id?: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt?: Date;
}

export interface ITransactionService<T> {
  createTransaction(transaction: ITransaction): Promise<ITransaction | undefined>;
  // getTransactions(accountId: number): Promise<T>;
}