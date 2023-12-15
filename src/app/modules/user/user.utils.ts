import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

type TUserRole = 'student' | 'faculty' | 'admin';

const findLastUserId = async (role: TUserRole) => {
  const lastUserId = await User.findOne({ role: role }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUserId?.id ? lastUserId.id : undefined;
};

// student id generate start id format = 2030 03 0001
export const generateStudentId = async (payload: IAcademicSemester) => {
  const lastStudentId = await findLastUserId('student');
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);

  let currentId = (0).toString();

  if (
    lastStudentId &&
    lastStudentYear === payload.year &&
    lastStudentCode === payload.code
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
// student id generate end

// Admin and Faculty id generate start. id format = A-0000, F-0000
export const generateAdminAndFacultyId = async (role: TUserRole) => {
  const lastUserId = await findLastUserId(role);

  let currentId = (0).toString();

  if (lastUserId) {
    currentId = lastUserId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${role === 'admin' ? 'A' : 'F'}-${incrementId}`;
  return incrementId;
};
// Admin and Faculty id generate end
