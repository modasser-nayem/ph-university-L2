import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await adminServices.getAllAdminsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    message: 'All Admins are retrieved successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.getSingleAdminFromDB(req.params.adminId);
  if (!result) {
    return new AppError(404, 'Admin not found!');
  }
  sendResponse(res, {
    statusCode: 200,
    message: 'Admin are retrieved successfully',
    data: result,
  });
});
const updateAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.updateAdminIntoDB(
    req.params.adminId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    message: 'Admin are updated successfully',
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req, res, next) => {
  const result = await adminServices.deleteAdminIntoDB(
    req.params.adminId,
    next,
  );
  if (!result) {
    throw new AppError(400, 'Failed to delete Admin!');
  }
  sendResponse(res, {
    statusCode: 200,
    message: 'Admin is deleted successfully',
    data: result,
  });
});

export const adminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
