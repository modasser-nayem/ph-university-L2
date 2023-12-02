import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.DEFAULT_PASSWORD as string);
  userData.role = 'student';

  // find academic semester
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(400, 'Invalid Admission Semester!');
  }
  userData.id = await generateStudentId(admissionSemester);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // create a user
    const newUser = await User.create([userData], { session: session });
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create User!');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student
    const newStudent = await Student.create([payload], { session: session });
    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create Student!');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to create Student!');
  }
};
const createFacultyIntoDB = async () => {
  return 'Faculty is working fine';
};
const createAdminIntoDB = async () => {
  return 'Admin is working fine';
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
