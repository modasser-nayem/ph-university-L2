import { Types } from 'mongoose';

type TUsername = {
  firstName: string;
  middleName: string;
  lastName: string;
};

type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface IStudent {
  id: string;
  user: Types.ObjectId;
  name: TUsername;
  password: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: boolean;
  isDeleted?: boolean;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
}
