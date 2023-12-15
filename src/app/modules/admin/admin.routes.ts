import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { adminValidations } from './admin.validation';
import { adminControllers } from './admin.controller';

const router = Router();

// Get all admins
router.get('/', adminControllers.getAllAdmins);

// Get single admin
router.get('/:adminId', adminControllers.getSingleAdmin);

// Update admin
router.patch(
  '/:adminId',
  validateRequest(adminValidations.updateAdminValidationSchema),
  adminControllers.updateAdmin,
);

// Delete admin
router.delete('/:adminId', adminControllers.deleteAdmin);

export const adminRoutes = router;
