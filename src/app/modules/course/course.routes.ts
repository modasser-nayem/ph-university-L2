import { Router } from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../middleware/validateRequest';
import { courseValidationSchemas } from './course.validation';

const router = Router();

// create course
router.post(
  '/',
  validateRequest(courseValidationSchemas.createCourseValidationSchema),
  courseControllers.createCourse,
);

// get all course
router.get('/', courseControllers.getAllCourses);

// get single course by course _id
router.get('/:courseId', courseControllers.getSingleCourse);

// update single course by course _id
router.patch(
  '/:courseId',
  validateRequest(courseValidationSchemas.updateCourseValidationSchema),
  courseControllers.updateCourse,
);

// delete single course by course _id
router.delete('/:courseId', courseControllers.deleteCourse);

// assign course faculties
router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidationSchemas.courseFacultiesValidationSchema),
  courseControllers.assignCourseFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(courseValidationSchemas.courseFacultiesValidationSchema),
  courseControllers.removeCourseFaculties,
);

export const courseRoutes = router;
