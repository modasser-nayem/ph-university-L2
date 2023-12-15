import { Router } from 'express';
import { facultyControllers } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { facultyValidations } from './faculty.validation';

const router = Router();

// Get all faculties
router.get('/', facultyControllers.getAllFaculties);

// Get single faculty
router.get('/:facultyId', facultyControllers.getSingleFaculty);

// Update faculty
router.patch(
  '/:facultyId',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyControllers.updateFaculty,
);

// Delete faculty
router.delete('/:facultyId', facultyControllers.deleteFaculty);

export const facultyRoutes = router;
