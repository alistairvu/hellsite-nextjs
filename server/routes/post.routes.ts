import { Router } from 'express';
import {
  createPost,
  destroyPost,
  showPost,
} from '../controllers/post.controller';
import checkAuth from '../middleware/auth.middleware';

const router = Router();

router.route('/').post(checkAuth, createPost);
router.route('/:id').delete(checkAuth, destroyPost).get(showPost);

export default router;
