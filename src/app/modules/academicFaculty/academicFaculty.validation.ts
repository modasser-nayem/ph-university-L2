import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Please provide academic faculty name',
        invalid_type_error: 'Academic faculty must ne string',
      })
      .min(4, { message: 'Name must be greater then 3' })
      .trim(),
  }),
});

export const academicFacultyValidations = {
  academicFacultyValidationSchema,
};
