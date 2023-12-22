import { z } from 'zod';

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

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      name: userNameValidationSchema,
      designation: z.string().trim(),
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
    }),
  }),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    name: userNameValidationSchema.optional(),
    designation: z.string().trim().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    age: z.number({ required_error: 'Age is required' }).min(1).optional(),
    dateOfBirth: z.string().optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Email is not a valid' })
      .optional(),
    contactNo: z
      .string({ required_error: 'Contact No is required' })
      .trim()
      .optional(),
    emergencyContactNo: z
      .string({ required_error: 'Contact No is required' })
      .trim()
      .optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAddress: z
      .string({ required_error: 'Present address is required' })
      .trim()
      .optional(),
    permanentAddress: z
      .string({ required_error: 'Permanent address is required' })
      .trim()
      .optional(),
    // profileImg: z.string().trim().optional(),
    academicDepartment: z.string(),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
