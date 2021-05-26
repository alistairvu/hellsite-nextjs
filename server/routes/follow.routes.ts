import { Router } from 'express';
import { createFollow, destroyFollow } from '../controllers/follow.controller';
import checkAuth from '../middleware/auth.middleware';

const router = Router();

router
  .route('/:id')
  .post(checkAuth, createFollow)
  .delete(checkAuth, destroyFollow);

export default router;
