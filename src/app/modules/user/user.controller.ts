import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  // parameter next pass because use transaction rollback
  const result = await userServices.createStudentIntoDB(
    password,
    studentData,
    next,
  );
  if (!result) {
    return new AppError(400, 'Failed to create Student!');
  }
  sendResponse(res, {
    statusCode: 200,
    message: 'Student create successfully',
    data: result,
  });
});
const createFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;

  // parameter next pass because use transaction rollback
  const result = await userServices.createFacultyIntoDB(
    password,
    facultyData,
    next,
  );
  if (!result) {
    return new AppError(400, 'Failed to create Faculty!');
  }
  sendResponse(res, {
    statusCode: 200,
    message: 'Faculty create successfully',
    data: result,
  });
});
const createAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, admin: adminData } = req.body;

  // parameter next pass because use transaction rollback
  const result = await userServices.createAdminIntoDB(
    password,
    adminData,
    next,
  );
  if (!result) {
    return new AppError(400, 'Failed to create Admin!');
  }
  sendResponse(res, {
    statusCode: 200,
    message: 'Admin create successfully',
    data: result,
  });
});

export const userControllers = { createStudent, createFaculty, createAdmin };
