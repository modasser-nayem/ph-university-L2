import { Router } from 'express';
import { facultyControllers } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../middleware/auth';

const router = Router();

// Get all faculties
router.get('/', auth('admin', 'faculty'), facultyControllers.getAllFaculties);

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
