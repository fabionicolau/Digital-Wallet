import User from "../database/models/User";
import Transaction from "../database/models/Transaction";

const userTransactionsReturn = (userTransactions: Transaction[]) => {
  if (!userTransactions.length) {
    const error = new Error('No transactions found');
    error.name = 'notFound';
    throw error;
  }
  
  const transactions = userTransactions.map(async (transaction) => {
  const { id, debitedAccountId, creditedAccountId, value, createdAt } = transaction;
  const debitedUser = await User.findOne({ where: { accountId: debitedAccountId } });
  const crediterUser = await User.findOne({ where: { accountId: creditedAccountId } }); 

  return {
    id,
    debitedAccountId,
    debitedUserName: debitedUser?.username,
    creditedAccountId,
    creditedUserName: crediterUser?.username,
    value,
    createdAt
  }
 });
 return Promise.all(transactions);
}

export default userTransactionsReturn;