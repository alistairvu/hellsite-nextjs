import { Router } from 'express';
import { refreshAccess } from '../controllers/refresh.controller';

const router = Router();

router.route('/').get(refreshAccess);

export default router;
