import { z } from 'zod';

// Custom validation function

const userNameValidationSchema = z.object(
  {
    firstName: z
      .string({ required_error: 'First Name is required' })
      .min(1)
      .max(20, { message: 'First Name can not be more than 20 characters' })
      .trim()
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      }),
    middleName: z.string().trim().optional(),
    lastName: z
      .string({ required_error: 'Last Name is required' })
      .max(20, { message: 'Last Name can not be more than 20 characters' })
      .trim(),
  },
  { required_error: 'Name is required' },
);

const guardianValidationSchema = z.object({
  fatherName: z.string({ required_error: 'Father Name is required' }).trim(),
  fatherOccupation: z
    .string({ required_error: 'Father Occupation is required' })
    .trim(),
  fatherContactNo: z
    .string({ required_error: 'Father ContactNo is required' })
    .trim(),
  motherName: z.string({ required_error: 'Mother Name is required' }).trim(),
  motherOccupation: z
    .string({ required_error: 'Mother Occupation is required' })
    .trim(),
  motherContactNo: z
    .string({ required_error: 'Mother ContactNo is required' })
    .trim(),
});

const localGuardianValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).trim(),
  occupation: z.string({ required_error: 'Occupation is required' }).trim(),
  contactNo: z.string({ required_error: 'ContactNo is required' }).trim(),
  address: z.string({ required_error: 'Address is required' }).trim(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      age: z.number({ required_error: 'Age is required' }).min(1),
      dateOfBirth: z.string().optional(),
      email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Email is not a valid' }),
      contactNo: z.string({ required_error: 'Contact No is required' }).trim(),
      emergencyContactNo: z
        .string({ required_error: 'Contact No is required' })
        .trim(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z
        .string({ required_error: 'Present address is required' })
        .trim(),
      permanentAddress: z
        .string({ required_error: 'Permanent address is required' })
        .trim(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().trim().optional(),
      admissionSemester: z.string().trim(),
      academicDepartment: z.string().refine((data) => {
        if (typeof data !== 'string' || data.trim() === '') {
          throw new Error('Value must be a non-empty string.');
        }
        return data;
      }),
    }),
  }),
});

// Updated student
const updateUserNameValidationSchema = z
  .object({
    firstName: z
      .string()
      .min(1)
      .max(20, { message: 'First Name can not be more than 20 characters' })
      .trim()
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      })
      .optional(),
    middleName: z.string().trim().optional(),
    lastName: z
      .string()
      .max(20, { message: 'Last Name can not be more than 20 characters' })
      .trim()
      .optional(),
  })
  .optional();

const updateGuardianValidationSchema = z
  .object({
    fatherName: z.string().trim().optional(),
    fatherOccupation: z.string().trim().optional(),
    fatherContactNo: z.string().trim().optional(),
    motherName: z.string().trim().optional(),
    motherOccupation: z.string().trim().optional(),
    motherContactNo: z.string().trim().optional(),
  })
  .optional();

const updateLocalGuardianValidationSchema = z
  .object({
    name: z.string().trim().optional(),
    occupation: z.string().trim().optional(),
    contactNo: z.string().trim().optional(),
    address: z.string().trim().optional(),
  })
  .optional();

const updateStudentValidationSchema = z.object({
  body: z.object({
    name: updateUserNameValidationSchema,
    gender: z.enum(['male', 'female', 'other']).optional(),
    age: z.number().min(1).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email({ message: 'Email is not a valid' }).optional(),
    contactNo: z.string().trim().optional(),
    emergencyContactNo: z.string().trim().optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAddress: z.string().trim().optional(),
    permanentAddress: z.string().trim().optional(),
    guardian: updateGuardianValidationSchema,
    localGuardian: updateLocalGuardianValidationSchema,
    profileImg: z.string().trim().optional(),
    admissionSemester: z.string().trim().optional(),
    academicDepartment: z.string().trim().optional(),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
