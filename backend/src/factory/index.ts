 import UserService from '../services/userService';
import UserController from '../controllers/userController';
import AccountController from '../controllers/accountController';
import AccountService from '../services/accountService';
 
// userInjection
const newUserService = new UserService();
const newUserController = new UserController(newUserService);

// accountInjection
const newAccountService = new AccountService();
const newAccountController = new AccountController(newAccountService);

export { newUserController, newAccountController };
