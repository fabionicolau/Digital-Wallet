import UserRepository from '../repository/userRepository';
import UserService from '../services/userService';
import UserController from '../controllers/userController';
import accountRepository from '../repository/accountRepository';
import AccountService from '../services/accountService';
import AccountController from '../controllers/accountController';
import TransactionRepository from '../repository/transactionsRepository';
import TransactionService from '../services/transactionsService';
import TransactionController from '../controllers/transactionsController';
 
// userInjection
const newUserRepository = new UserRepository();
const newUserService = new UserService(newUserRepository);
const newUserController = new UserController(newUserService);

// accountInjection
const newAccountRepository = new accountRepository();
const newAccountService = new AccountService(newAccountRepository);
const newAccountController = new AccountController(newAccountService);

// transactionInjection
const newTransactionRepository = new TransactionRepository();
const newTransactionService = new TransactionService(newTransactionRepository);
const newTransactionController = new TransactionController(newTransactionService);

export { newUserController, newAccountController, newTransactionController };
