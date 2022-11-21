import Account from '../database/models/Account';
import User from '../database/models/User';

const transactionValidate = async (accountId: number, creditedUserName: string, value: number) => {
  const debitedAccount = await Account.findOne({ where: { id: accountId } });
  const creditedUser = await User.findOne({ where: { username: creditedUserName } });

  if (value <= 0) {
    const error = new Error('O valor deve ser maior do que 0');
    error.name = 'conflict';
    throw error;
  }

  if (!creditedUser) {
    const error = new Error('Usuário não encontrado');
    error.name = 'notFound';
    throw error;
  }

  if (accountId === creditedUser.accountId) {
    const error = new Error('Você não pode transferir para a sua própria conta');
    error.name = 'conflict';
    throw error; 
  }

  if (debitedAccount && debitedAccount.balance < Number(value)) {
    const error = new Error('Saldo insuficiente');
    error.name = 'conflict';
    throw error;
  }

  return creditedUser.accountId;
};

export default transactionValidate;