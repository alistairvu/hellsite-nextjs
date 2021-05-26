import { Router } from 'express';
import { createLike, destroyLike } from '../controllers/like.controller';
import checkAuth from '../middleware/auth.middleware';

const router = Router();

router.route('/:id').post(checkAuth, createLike).delete(checkAuth, destroyLike);

export default router;
