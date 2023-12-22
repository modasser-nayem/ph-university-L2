import { Router } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';
import { adminValidations } from '../admin/admin.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import auth from '../../middleware/auth';
import { userValidationSchemas } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';
import { requestStringToJson } from '../../middleware/requestStringToJson';

const router = Router();

// create admin
router.post(
  '/create-student',
  auth('admin'),
  upload.single('file'),
  requestStringToJson,
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);
// create faculty id format -> F-0001
router.post(
  '/create-faculty',
  auth('admin'),
  upload.single('file'),
  requestStringToJson,
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userControllers.createFaculty,
);

// create admin id format -> A-0001
router.post(
  '/create-admin',
  auth('admin'),
  upload.single('file'),
  requestStringToJson,
  validateRequest(adminValidations.createAdminValidationSchema),
  userControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(userValidationSchemas.changeUserStatusValidationSchema),
  userControllers.changeUserStatus,
);

// get my profile
router.get('/me', auth('admin', 'faculty', 'student'), userControllers.getMe);

// image upload testing
router.post(
  '/image-upload',
  upload.single('file'),
  userControllers.imageUpload,
);

export const userRoutes = router;
