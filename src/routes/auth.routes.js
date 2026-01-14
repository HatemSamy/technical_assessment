import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { validation } from '../middlewares/validation.middleware.js';
import { loginValidation } from '../validations/auth.validation.js';

const router = Router();

router.post('/login', validation(loginValidation), login);

export { router };
