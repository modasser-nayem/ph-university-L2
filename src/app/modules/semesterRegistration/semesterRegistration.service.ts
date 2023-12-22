import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      404,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`,
    );
  }

  // check if the academic semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(404, 'This Academic Semester is not found!');
  }

  // check if the semester is already registered
  const isSemesterRegistered = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistered) {
    throw new AppError(400, 'This semester is already registered!');
  }

  //  new semester registration
  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);

  if (!result) {
    throw new AppError(404, 'Semester Registration not found!');
  }

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  // check semester registration exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(404, 'This semester is not found!');
  }

  const currentRegistrationStatus = isSemesterRegistrationExists.status;
  const requestedRegistrationStatus = payload?.status;

  // check semester registration is ended
  if (currentRegistrationStatus === RegistrationStatus.ENDED) {
    throw new AppError(400, 'This semester registration is already Ended');
  }

  if (
    currentRegistrationStatus === RegistrationStatus.UPCOMING &&
    requestedRegistrationStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      400,
      `You can't directly change status from ${currentRegistrationStatus} to ${requestedRegistrationStatus}`,
    );
  }

  if (
    currentRegistrationStatus === RegistrationStatus.ONGOING &&
    requestedRegistrationStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      400,
      `You can't directly change status from ${currentRegistrationStatus} to ${requestedRegistrationStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  return id;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
