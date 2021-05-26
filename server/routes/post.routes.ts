import { Router } from 'express';
import { createPost, destroyPost } from '../controllers/post.controller';
import checkAuth from '../middleware/auth.middleware';

const router = Router();

router.route('/').post(checkAuth, createPost);
router.route('/:id').delete(checkAuth, destroyPost);

export default router;
