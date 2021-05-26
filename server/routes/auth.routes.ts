import { Router } from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
} from '../controllers/auth.controller';

const router = Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').delete(logoutUser);

export default router;
