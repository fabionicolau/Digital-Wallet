import * as Sequelize from 'sequelize';
import sequelize from '../database/models';
import { ITransaction, ITransacionRepository, ITransactionBodyWithCreditedAccountId,
  ITransactionBody, ITransactionWithUsernames } from '../interfaces/transactionsInterfaces';
import Transaction from '../database/models/Transaction';
import Account from '../database/models/Account';
import transactionValidate from '../validations/accountValidate';
import userTransactionsReturn from '../helpers/userTransactionsReturn';
import User from '../database/models/User';

export default class TransactionRepository implements ITransacionRepository {
  createTransaction = async (transactionBody: ITransactionBodyWithCreditedAccountId)
  : Promise<ITransaction | undefined> => {
    const { debitedAccountId, creditedAccountId, value } = transactionBody;
     
    
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

  getAllTransactions = async (accountId: number): Promise<Transaction[]> => {
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

    return userTransactions as Transaction[];
  };
}