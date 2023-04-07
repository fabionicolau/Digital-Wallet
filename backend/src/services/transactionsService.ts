import * as Sequelize from 'sequelize';
import sequelize from '../database/models';
import { ITransaction, ITransactionService,
  ITransactionBody, ITransactionWithUsernames } from '../interfaces/transactionsInterfaces';
import Transaction from '../database/models/Transaction';
import Account from '../database/models/Account';
import transactionValidate from '../validations/accountValidate';
import userTransactionsReturn from '../helpers/userTransactionsReturn';
import User from '../database/models/User';

export default class TransactionService implements ITransactionService {
  createTransaction = async (transactionBody: ITransactionBody)
  : Promise<ITransaction | undefined> => {
    const { debitedAccountId, username, value } = transactionBody;
     
    const creditedAccountId = await transactionValidate(debitedAccountId, username, value);
    
    const t = await sequelize.transaction();
    
    try {
      const transaction = await Transaction.create(
        { debitedAccountId, creditedAccountId, value, createdAt: new Date() },
        { transaction: t },
      );

      await Account.update( 
        { balance: Sequelize.literal(`balance - ${value}`) },
        { where: { id: debitedAccountId }, transaction: t },
      );

      await Account.update(
        { balance: Sequelize.literal(`balance + ${value}`) },
        { where: { id: creditedAccountId }, transaction: t },
      );
      
      await t.commit();

      return transaction;
    } catch (error) {
      await t.rollback();
    }
  };

  getAllTransactions = async (accountId: number): Promise<ITransactionWithUsernames[]> => {
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