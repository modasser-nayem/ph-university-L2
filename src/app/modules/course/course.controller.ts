import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    message: 'All courses are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getSingleCourseFromDB(
    req.params.courseId,
  );

  sendResponse(res, {
    statusCode: 200,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const result = await courseServices.updateCourseIntoDB(
    req.params.courseId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    message: 'Courses are updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await courseServices.deleteCourseFromDB(req.params.courseId);

  sendResponse(res, {
    statusCode: 200,
    message: 'Course is deleted successfully',
    data: result,
  });
});

const assignCourseFaculties = catchAsync(async (req, res) => {
  const result = await courseServices.assignCourseFacultiesIntoDB(
    req.params.courseId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    message: 'Course Faculties assign successfully',
    data: result,
  });
});

const removeCourseFaculties = catchAsync(async (req, res) => {
  const result = await courseServices.removeCourseFacultiesFromDB(
    req.params.courseId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    message: 'Course Faculties remove successfully',
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignCourseFaculties,
  removeCourseFaculties,
};
