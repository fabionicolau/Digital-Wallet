import * as Sequelize from 'sequelize';
import sequelize from '../database/models';
import { ITransaction, ITransactionService, ITransacionRepository,
  ITransactionBody, ITransactionWithUsernames } from '../interfaces/transactionsInterfaces';
import Transaction from '../database/models/Transaction';
import Account from '../database/models/Account';
import transactionValidate from '../validations/accountValidate';
import userTransactionsReturn from '../helpers/userTransactionsReturn';
import User from '../database/models/User';

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

    if (!userTransactions) {
      const error = new Error('Transação não encontrada');
      error.name = 'notFound';
      throw error;
    }


    return userTransactionsReturn(userTransactions) as ITransactionWithUsernames[];
  };


  private getTransactionByDate = async (accountId: number, date: string)
  : Promise<ITransactionWithUsernames[]> => {
    const userTransactions = await Transaction.findAll({
      where: {
        [Sequelize.Op.or]: [
          {
            debitedAccountId: accountId,
          },
          {
            creditedAccountId: accountId,
          },
        ],
        createdAt: date,
      },  
      include: [
        {
          model: Account,
          as: 'debitedAccount',
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
        {
          model: Account,
          as: 'creditedAccount',
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    return userTransactionsReturn(userTransactions) as ITransactionWithUsernames[];
  };

  // eslint-disable-next-line max-len
  private getTransactionByCashoutOrCashinAndDate = async (accountId: number, date: string, transaction: string)
  : Promise<ITransactionWithUsernames[]> => {
    const accountIdString = transaction.toLowerCase() === 'cashout'
      ? 'debitedAccountId' : 'creditedAccountId';
    let userTransactions = [] as Transaction[];

    if (date) {
      userTransactions = await Transaction.findAll({
        where: {
          [accountIdString]: accountId,
          createdAt: date,
        }, include: [
          {
            model: Account,
            as: 'debitedAccount',
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          },
          {
            model: Account,
            as: 'creditedAccount',
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          },
        ],
      }) as Transaction[];
    }
    if (!date) {
      userTransactions = await Transaction.findAll({
        where: {
          [accountIdString]: accountId,
        }, 
        include: [
          {
            model: Account,
            as: 'debitedAccount',
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          },
          {
            model: Account,
            as: 'creditedAccount',
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          },
        ],
      }); 
    }

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
    return this.getTransactionByCashoutOrCashinAndDate(accountId, date, transaction);
  };
} 