import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicFacultyValidations } from './academicFaculty.validation';
import { academicFacultyControllers } from './academicFaculty.controller';

const router = Router();

// create academic faculty
router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidations.academicFacultyValidationSchema),
  academicFacultyControllers.createAcademicFaculty,
);

// get all academic faculties
router.get('/', academicFacultyControllers.getAllAcademicFaculties);

// get single academic faculty
router.get('/:id', academicFacultyControllers.getSingleAcademicFaculty);

// update single academic faculty
router.patch(
  '/:id',
  validateRequest(academicFacultyValidations.academicFacultyValidationSchema),
  academicFacultyControllers.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
