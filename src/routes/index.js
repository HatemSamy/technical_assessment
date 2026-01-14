import { Router } from 'express';

import { router as authRouter } from './auth.routes.js';
import { router as serviceRouter } from './service.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/services', serviceRouter);

export { router };

