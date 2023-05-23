import Transaction from '../database/models/Transaction';

const userTransactionsReturn = (userTransactions: Transaction[]) => {
  if (!userTransactions.length) {
    const error = new Error('Transação não encontrada');
    error.name = 'notFound';
    throw error;
  }

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