import { Router } from 'express';
import { createRepost, destroyRepost } from '../controllers/repost.controller';
import checkAuth from '../middleware/auth.middleware';

const router = Router();

router
  .route('/:id')
  .post(checkAuth, createRepost)
  .delete(checkAuth, destroyRepost);

export default router;
