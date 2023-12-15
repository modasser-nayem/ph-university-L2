import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateAdminAndFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { NextFunction } from 'express';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../admin/admin.model';

// Create Student
const createStudentIntoDB = async (
  password: string,
  payload: IStudent,
  next: NextFunction,
) => {
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

  // find academic department
  if (!(await AcademicDepartment.findById(payload.academicDepartment))) {
    throw new AppError(400, 'Invalid Admission Department!');
  }
  userData.id = await generateStudentId(admissionSemester);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // create a user
    const newUser = await User.create([userData], { session: session });

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student
    const newStudent = await Student.create([payload], { session: session });

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

// Create Faculty
const createFacultyIntoDB = async (
  password: string,
  payload: IFaculty,
  next: NextFunction,
) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.DEFAULT_PASSWORD as string);
  userData.role = 'faculty';

  // find academic department
  if (!(await AcademicDepartment.findById(payload.academicDepartment))) {
    throw new AppError(400, 'Invalid Admission Department!');
  }
  userData.id = await generateAdminAndFacultyId('faculty');

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // create a user
    const newUser = await User.create([userData], { session: session });

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student
    const newFaculty = await Faculty.create([payload], { session: session });
    if (!newFaculty) {
      return new AppError(400, 'Failed to create Faculty!');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

// Create Admin
const createAdminIntoDB = async (
  password: string,
  payload: IAdmin,
  next: NextFunction,
) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.DEFAULT_PASSWORD as string);
  userData.role = 'admin';

  userData.id = await generateAdminAndFacultyId('admin');

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // create a user
    const newUser = await User.create([userData], { session: session });

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student
    const newAdmin = await Admin.create([payload], { session: session });
    if (!newAdmin) {
      return new AppError(400, 'Failed to create Admin!');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
