import UserRepository from '../repository/userRepository';
import UserService from '../services/userService';
import UserController from '../controllers/userController';
import accountRepository from '../repository/accountRepository';
import AccountService from '../services/accountService';
import AccountController from '../controllers/accountController';
import TransactionController from '../controllers/transactionsController';
import TransactionService from '../services/transactionsService';
 
// userInjection
const newUserRepository = new UserRepository();
const newUserService = new UserService(newUserRepository);
const newUserController = new UserController(newUserService);

// accountInjection
const newAccountRepository = new accountRepository();
const newAccountService = new AccountService(newAccountRepository);
const newAccountController = new AccountController(newAccountService);

// transactionInjection
const newTransactionService = new TransactionService();
const newTransactionController = new TransactionController(newTransactionService);

export { newUserController, newAccountController, newTransactionController };
