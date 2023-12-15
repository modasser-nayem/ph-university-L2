import { Router } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';
import { adminValidations } from '../admin/admin.validation';
import { facultyValidations } from '../faculty/faculty.validation';

const router = Router();

// create admin
router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);
// create faculty id format -> F-0001
router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userControllers.createFaculty,
);

// create admin id format -> A-0001
router.post(
  '/create-admin',
  validateRequest(adminValidations.createAdminValidationSchema),
  userControllers.createAdmin,
);

export const userRoutes = router;
