import { Router } from 'express';
import { newUserController } from '../factory/index';

const router = Router();

router.post('/login', newUserController.userLogin);
router.post('/register', newUserController.userRegister);

export default router;
