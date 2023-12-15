import { User } from '../user/user.model';
import { IStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { studentSearchableFields } from './student.constant';
import QueryBuilder from '../../builder/QueryBuilder';

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate({
    path: 'admissionSemester',
    select: 'name year code -_id',
  });
  return result;
};
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifyUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifyUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifyUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifyUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentIntoDB = async (id: string) => {
  const existStudent = await Student.findOne({ id });
  if (!existStudent) {
    throw new AppError(404, 'Student not found!');
  }

  if (existStudent?.isDeleted) {
    throw new AppError(400, 'Student already Deleted');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // delete student
    await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    // delete user
    await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    await session.commitTransaction();
    await session.endSession();

    return true;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to delete student!');
  }
};

export const studentServices = {
  getSingleStudentFromDB,
  getAllStudentsFromDB,
  updateStudentIntoDB,
  deleteStudentIntoDB,
};
