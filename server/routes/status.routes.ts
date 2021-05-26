import { Router } from 'express';
import { getStatus } from '../controllers/status.controller';

const router = Router();

router.route('/').get(getStatus);

export default router;
