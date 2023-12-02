import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: 200,
    message: 'All students are retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const result = await studentServices.getSingleStudentFromDB(req.params.id);
  if (!result) {
    next(new AppError(404, 'Student not found!'));
  }
  sendResponse(res, {
    statusCode: 200,
    message: 'Student are retrieved successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const result = await studentServices.updateStudentIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    message: 'Student are updated successfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const result = await studentServices.deleteStudentIntoDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
