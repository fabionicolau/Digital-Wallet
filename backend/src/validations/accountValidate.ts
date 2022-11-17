import Account from "../database/models/Account";

const accountValidate = async (debited: number, credited: number, value: number) => {
  const debitedAccount = await Account.findOne({ where: { id: debited } });
  const creditedAccount = await Account.findOne({ where: { id: credited } });

  if (value <= 0) {
    const error = new Error("Value must be greater than 0");
    error.name = "conflict";
    throw error;
  }

  if (debited === credited) {
    const error = new Error('You cannot transfer to the same account');
    error.name = 'conflict';
    throw error; 
  }

  if (debitedAccount && debitedAccount.balance < value) {
    const error = new Error('Insufficient balance');
    error.name = 'conflict';
    throw error;
  }

  if (!creditedAccount) {
    const error = new Error("Credited account not found");
    error.name = "notFound";
    throw error;
  }
}

export default accountValidate;