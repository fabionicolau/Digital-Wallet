import Transaction from '../database/models/Transaction';

const userTransactionsReturn = (userTransactions: Transaction[]) => {
  const transactions = userTransactions.map((transaction) => {
    const { id, debitedAccount, creditedAccount, debitedAccountId, creditedAccountId, value, createdAt } = transaction as any;
    return { id,
    debitedAccountId,
    debitedUserName: debitedAccount.Users[0].username,
    creditedAccountId,
    creditedUserName: creditedAccount.Users[0].username,
    value,
    createdAt };
  });

  return transactions
};

export default userTransactionsReturn;