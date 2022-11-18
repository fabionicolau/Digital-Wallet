import { IUserAccount } from "../interfaces/accountInterfaces";
import Account from "../database/models/Account";
import User from "../database/models/User";

const transactionValidate = async (debitedAccountId: number, creditedUserName: string, value: number) => {
  const debitedAccount = await Account.findOne({ where: { id: debitedAccountId } });
  const creditedUser = await User.findOne({ where: { username: creditedUserName } });

  if (value <= 0) {
    const error = new Error("Value must be greater than 0");
    error.name = "conflict";
    throw error;
  }

  if (!creditedUser) {
    const error = new Error("Credited account not found");
    error.name = "notFound";
    throw error;
  }

  if (debitedAccountId === creditedUser.accountId) {
    const error = new Error('You cannot transfer to the same account');
    error.name = 'conflict';
    throw error; 
  }

  if (debitedAccount && debitedAccount.balance < value) {
    const error = new Error('Insufficient balance');
    error.name = 'conflict';
    throw error;
  }

  return creditedUser.accountId
}

export default transactionValidate;