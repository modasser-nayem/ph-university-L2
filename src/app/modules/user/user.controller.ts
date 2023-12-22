import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  // parameter next pass because use transaction rollback
  const result = await userServices.createStudentIntoDB(
    req.file,
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
    req.file,
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
    req.file,
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

const changeUserStatus: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const result = await userServices.changeUserStatus(id, status);

  sendResponse(res, {
    statusCode: 200,
    message: 'Status is updated successfully',
    data: result,
  });
});

const getMe: RequestHandler = catchAsync(async (req, res) => {
  const { id, role } = req.user;
  const result = await userServices.getMeFromDB({ id, role });

  sendResponse(res, {
    statusCode: 200,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const imageUpload: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.imageUpload(req.file);

  sendResponse(res, {
    statusCode: 200,
    message: 'Image upload successfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  changeUserStatus,
  getMe,
  imageUpload,
};
