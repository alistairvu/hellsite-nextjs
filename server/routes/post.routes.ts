import { Router } from 'express';
import {
  createPost,
  destroyPost,
  showPost,
} from '../controllers/post.controller';
import checkAuth from '../middleware/auth.middleware';
import setUser from '../middleware/user.middleware';

const router = Router();

router.route('/').post(checkAuth, createPost);
router.route('/:id').delete(checkAuth, destroyPost).get(setUser, showPost);

export default router;
