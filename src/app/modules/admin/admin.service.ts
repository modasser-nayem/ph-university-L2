import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { NextFunction } from 'express';
import { Admin } from './admin.model';
import { adminSearchableFields } from './admin.constant';
import { IAdmin } from './admin.interface';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;

  return result;
};

const getSingleAdminFromDB = async (adminId: string) => {
  const result = await Admin.findOne(
    { id: adminId },
    { _id: 0, isDeleted: 0, __v: 0 },
  );
  return result;
};

const updateAdminIntoDB = async (adminId: string, payload: Partial<IAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifyUpdateData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate(
    { id: adminId },
    modifyUpdateData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteAdminIntoDB = async (adminId: string, next: NextFunction) => {
  const existAdmin = await Admin.findOne({ id: adminId });
  if (!existAdmin) {
    throw new AppError(404, 'Admin not found!');
  }

  if (existAdmin?.isDeleted) {
    throw new AppError(400, 'Admin already Deleted');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // delete Admin
    const result = await Admin.findOneAndUpdate(
      { id: adminId },
      { isDeleted: true },
      { new: true, session },
    );
    // delete user
    await User.findOneAndUpdate(
      { id: adminId },
      { isDeleted: true },
      { new: true, session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export const adminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminIntoDB,
};
