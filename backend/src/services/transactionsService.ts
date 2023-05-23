import { ITransaction, ITransactionService, ITransacionRepository,
  ITransactionBody, ITransactionWithUsernames } from '../interfaces/transactionsInterfaces';
import transactionValidate from '../validations/accountValidate';
import userTransactionsReturn from '../helpers/userTransactionsReturn';

export default class TransactionService implements ITransactionService {
  constructor(private transactionRepository: ITransacionRepository) {}
  createTransaction = async (transactionBody: ITransactionBody)
  : Promise<ITransaction | undefined> => {
    const { debitedAccountId, username, value } = transactionBody;
     
    const creditedAccountId = await transactionValidate(debitedAccountId, username, value);
    
    const transaction = await this.transactionRepository.createTransaction({...transactionBody, creditedAccountId})

    if (!transaction) {
      const error = new Error('Erro ao criar a transação');
      error.name = 'validationError';
      throw error;
    }
    
    return transaction;
  };

  getAllTransactions = async (accountId: number): Promise<ITransactionWithUsernames[]> => {
    const userTransactions = await this.transactionRepository.getAllTransactions(accountId);

    return userTransactionsReturn(userTransactions) as ITransactionWithUsernames[];
  };


  private getTransactionByDate = async (accountId: number, date: string)
  : Promise<ITransactionWithUsernames[]> => {
    const userTransactions = await this.transactionRepository.getTransactionByDate(accountId, date);
    
    return userTransactionsReturn(userTransactions) as ITransactionWithUsernames[];
  };

  private getTransactionByCashoutOrCashin = async (accountId: number, transaction: string)
  : Promise<ITransactionWithUsernames[]> => {
    const accountIdString = transaction.toLowerCase() === 'cashout'
      ? 'debitedAccountId' : 'creditedAccountId';

    const userTransactions = await this.transactionRepository
    .getTransactionByCashoutOrCashin(accountIdString, accountId);

    return userTransactionsReturn(userTransactions) as ITransactionWithUsernames[];
  };

  private getTransactionByCashoutOrCashinAndDate = async (accountId: number, date: string, transaction: string)
  : Promise<ITransactionWithUsernames[]> => {
    const accountIdString = transaction.toLowerCase() === 'cashout'
      ? 'debitedAccountId' : 'creditedAccountId';
 
    const userTransactions = await this.transactionRepository
    .getTransactionByCashoutOrCashinWithDate(accountIdString, accountId, date);
    
    return userTransactionsReturn(userTransactions) as ITransactionWithUsernames[];
  };
 
  getFilteredTransactions = async (accountId: number, date: string, transaction: string)
  : Promise<ITransactionWithUsernames[] | undefined> => {
    if (!date && !transaction) {
      return this.getAllTransactions(accountId);
    }
    if (date && !transaction) {
      return this.getTransactionByDate(accountId, date);
    }
    if (!date && transaction) {
      return this.getTransactionByCashoutOrCashin(accountId, transaction);
    }

    return this.getTransactionByCashoutOrCashinAndDate(accountId, date, transaction);
  };
} 