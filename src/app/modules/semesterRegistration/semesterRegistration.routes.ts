import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationValidationSchemas } from './semesterRegistration.validation';
import { semesterRegistrationControllers } from './semesterRegistration.controller';

const router = Router();

// create semester registration
router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidationSchemas.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

// get all semester registration
router.get('/', semesterRegistrationControllers.getAllSemesterRegistrations);

// get single semester registration
router.get(
  '/:id',
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

// update semester registration
router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidationSchemas.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

// delete semester registration
router.delete(
  '/:id',
  semesterRegistrationControllers.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
