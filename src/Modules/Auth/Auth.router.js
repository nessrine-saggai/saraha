import { Router } from 'express';
import * as AuthController from './controller/Auth.controller.js';
import { asyncHandler } from '../../services/errorHandlling.js';
import validation from '../../Middleware/validation.js';
import * as validator from './Auth.validation.js'
const router = Router();

router.post('/signup',validation(validator.signupSchema),asyncHandler (AuthController.signup));
router.post('/login', validation(validator.loginSchema), asyncHandler(AuthController.login));
router.get('/confirmEmail/:token', AuthController.confirmEmail);

export default router;