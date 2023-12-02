import { Router } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';

const router = Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);
router.post('/create-faculty', userControllers.createFaculty);
router.post('/create-admin', userControllers.createAdmin);

export const userRoutes = router;
