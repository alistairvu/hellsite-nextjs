import { Router } from 'express';
import {
  createQuotePost,
  destroyQuotePost,
} from '../controllers/quote.controller';
import checkAuth from '../middleware/auth.middleware';

const router = Router();

router
  .route('/:id')
  .post(checkAuth, createQuotePost)
  .delete(checkAuth, destroyQuotePost);

export default router;
