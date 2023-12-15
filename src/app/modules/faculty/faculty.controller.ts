import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultiesFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    message: 'All Faculties are retrieved successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const result = await facultyServices.getSingleFacultyFromDB(
    req.params.facultyId,
  );
  if (!result) {
    return new AppError(404, 'Faculty not found!');
  }
  sendResponse(res, {
    statusCode: 200,
    message: 'Faculty are retrieved successfully',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req, res) => {
  const result = await facultyServices.updateFacultyIntoDB(
    req.params.facultyId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    message: 'Faculty are updated successfully',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req, res, next) => {
  const result = await facultyServices.deleteFacultyIntoDB(
    req.params.facultyId,
    next,
  );
  if (!result) {
    throw new AppError(400, 'Failed to delete Faculty!');
  }
  sendResponse(res, {
    statusCode: 200,
    message: 'Faculty is deleted successfully',
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
