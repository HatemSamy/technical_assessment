import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';
import { createService, getServices } from '../controllers/service.controller.js';
import { validation } from '../middlewares/validation.middleware.js';
import { createServiceValidation, getServicesValidation } from '../validations/service.validation.js';

const router = Router();

router.post('/', authenticate, authorizeRoles('ADMIN'), validation(createServiceValidation), createService);
router.get('/', authenticate, validation(getServicesValidation), getServices);

export { router };
