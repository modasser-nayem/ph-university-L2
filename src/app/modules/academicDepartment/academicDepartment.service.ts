import AppError from '../../errors/AppError';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
  const existAcademicDepartment = await AcademicDepartment.findOne({
    name: payload.name,
  });
  if (existAcademicDepartment) {
    throw new AppError(400, 'This department already exist!');
  }
  const result = await AcademicDepartment.create(payload);

  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find();

  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate({
    path: 'academicFaculty',
    select: 'name -_id',
  });
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: IAcademicDepartment,
) => {
  const existAcademicDepartment = await AcademicDepartment.findById(id);
  if (!existAcademicDepartment) {
    throw new AppError(404, 'The Department does not exist!');
  }

  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
