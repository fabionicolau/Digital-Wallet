import { ITransaction, ITransactionService, ITransactionBody } from "../interfaces/transactionsInterfaces";
import Transaction from "../database/models/Transaction";
import Account from "../database/models/Account";
import accountValidate from "../validations/accountValidate";
import sequelize from "../database/models";
import * as Sequelize from "sequelize";

export default class TransactionService implements ITransactionService {
   createTransaction = async (transaction: ITransactionBody): Promise<ITransaction | undefined> => {
    const { debitedAccountId, username, value } = transaction;
     
    const creditedAccountId = await accountValidate(debitedAccountId, username, value);
    
    const t = await sequelize.transaction();
    
    try {
      const transaction = await Transaction.create(
        { debitedAccountId, creditedAccountId, value, createdAt: new Date() },
        { transaction: t });

      await Account.update( 
        { balance: Sequelize.literal(`balance - ${value}`)},
        { where: { id: debitedAccountId }, transaction: t });

      await Account.update(
        { balance: Sequelize.literal(`balance + ${value}`)},
        { where: { id: creditedAccountId }, transaction: t });
      
      await t.commit();

      return transaction;
    } catch (error) {
      await t.rollback();
    }
  };
} 