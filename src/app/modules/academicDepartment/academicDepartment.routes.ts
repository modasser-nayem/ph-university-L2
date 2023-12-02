import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicDepartmentValidations } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academicDepartment.controller';

const router = Router();

// create academic department
router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);

// get all academic departments
router.get('/', academicDepartmentControllers.getAllAcademicDepartments);

// get single academic department
router.get('/:id', academicDepartmentControllers.getSingleAcademicDepartment);

// update single academic department
router.patch(
  '/:id',
  validateRequest(
    academicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
