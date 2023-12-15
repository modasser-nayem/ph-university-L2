import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { NextFunction } from 'express';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;

  return result;
};

const getSingleFacultyFromDB = async (facultyId: string) => {
  const result = await Faculty.findOne(
    { id: facultyId },
    { _id: 0, isDeleted: 0, __v: 0 },
  ).populate({
    path: 'academicDepartment',
    select: 'name -_id',
    populate: {
      path: 'academicFaculty',
      select: 'name',
    },
  });
  return result;
};

const updateFacultyIntoDB = async (
  facultyId: string,
  payload: Partial<IFaculty>,
) => {
  const { name, ...remainingFacultyData } = payload;

  const modifyUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate(
    { id: facultyId },
    modifyUpdateData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteFacultyIntoDB = async (facultyId: string, next: NextFunction) => {
  const existFaculty = await Faculty.findOne({ id: facultyId });
  if (!existFaculty) {
    throw new AppError(404, 'Faculty not found!');
  }

  if (existFaculty?.isDeleted) {
    throw new AppError(400, 'Faculty already Deleted');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // delete Faculty
    const result = await Faculty.findOneAndUpdate(
      { id: facultyId },
      { isDeleted: true },
      { new: true, session },
    );
    // delete user
    await User.findOneAndUpdate(
      { id: facultyId },
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

export const facultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyIntoDB,
};
