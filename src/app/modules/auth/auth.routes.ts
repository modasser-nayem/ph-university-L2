import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { authValidationSchemas } from './auth.validation';
import { authControllers } from './auth.controller';
import auth from '../../middleware/auth';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidationSchemas.loginValidationSchema),
  authControllers.loginUser,
);

router.post(
  '/change-password',
  auth('admin', 'faculty', 'student'),
  validateRequest(authValidationSchemas.changePasswordValidationSchema),
  authControllers.changePassword,
);

router.post('/refresh-token', authControllers.refreshToken);

router.post(
  '/forget-password',
  validateRequest(authValidationSchemas.forgetPasswordValidationSchema),
  authControllers.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(authValidationSchemas.resetPasswordValidationSchema),
  authControllers.resetPassword,
);

export const authRoutes = router;
