 import UserService from '../services/userService';
import UserController from '../controllers/userController';
import AccountController from '../controllers/accountController';
import AccountService from '../services/accountService';
import TransactionController from '../controllers/transactionsController';
import TransactionService from '../services/transactionsService';
 
// userInjection
const newUserService = new UserService();
const newUserController = new UserController(newUserService);

// accountInjection
const newAccountService = new AccountService();
const newAccountController = new AccountController(newAccountService);


// transactionInjection
const newTransactionService = new TransactionService();
const newTransactionController = new TransactionController(newTransactionService);

export { newUserController, newAccountController, newTransactionController };
