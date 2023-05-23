import Transaction from '../database/models/Transaction';

export interface ITransaction {
  id?: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt?: Date;
}

export interface ITransactionWithUsernames extends ITransaction {
  debitedUserName: string;
  creditedUserName: string;
}

export interface ITransactionBody {
  debitedAccountId: number;
  username: string;
  value: number; 
}

export interface ITransactionBodyWithCreditedAccountId extends ITransactionBody {
  creditedAccountId: number;
}

export type TypeAccountIdString = "debitedAccountId" | "creditedAccountId"

export interface ITransacionRepository {
  createTransaction(transactionBody: ITransactionBodyWithCreditedAccountId): Promise<ITransaction | undefined>;
  getAllTransactions(accountId: number): Promise<Transaction[]>;
  getTransactionByDate(accountId: number, date: string): Promise<Transaction[]>;
  getTransactionByCashoutOrCashin(accountIdString: TypeAccountIdString, accountId: number) 
  : Promise<Transaction[]>
  getTransactionByCashoutOrCashinWithDate(accountIdString: TypeAccountIdString, accountId: number, date: string) 
  : Promise<Transaction[]>
}

export interface ITransactionService {
  createTransaction(transaction: ITransactionBody): Promise<ITransaction | undefined>;
  getAllTransactions(accountId: number): Promise<ITransactionWithUsernames[]>;
  getFilteredTransactions(accountId: number, date: string, transaction: string)
  : Promise<ITransactionWithUsernames[] | undefined>;
}