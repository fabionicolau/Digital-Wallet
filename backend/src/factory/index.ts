 import UserService from '../services/userService';
import UserController from '../controllers/userController';
 
// userInjection
const newUserService = new UserService();
const newUserController = new UserController(newUserService);

export { newUserController };
