import { Types } from 'mongoose';

type TUsername = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export interface IAdmin {
  id: string;
  user: Types.ObjectId;
  name: TUsername;
  designation: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted?: boolean;
}
