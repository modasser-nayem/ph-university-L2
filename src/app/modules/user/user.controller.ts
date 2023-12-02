import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await userServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: 200,
    message: 'Student create successfully',
    data: result,
  });
});
const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.createFacultyIntoDB();
  sendResponse(res, { statusCode: 200, data: result });
});
const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.createAdminIntoDB();
  sendResponse(res, { statusCode: 200, data: result });
});

export const userControllers = { createStudent, createFaculty, createAdmin };
