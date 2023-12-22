import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: 201,
    message: 'Semester Registration is created successfully!',
    data: result,
  });
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationsFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: 200,
    message: 'Semester Registrations retrieved successfully!',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: 200,
    message: 'Semester Registration retrieved successfully!',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationIntoDB(
      req.params.id,
      req.body,
    );

  sendResponse(res, {
    statusCode: 200,
    message: 'Semester Registration is updated successfully!',
    data: result,
  });
});

const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.deleteSemesterRegistrationFromDB(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: 200,
    message: 'Semester Registration is deleted successfully!',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
