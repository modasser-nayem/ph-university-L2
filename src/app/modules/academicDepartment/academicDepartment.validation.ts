import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Please provide academic Department name',
        invalid_type_error: 'Academic Department must ne string',
      })
      .min(4, { message: 'Name must be greater then 3' })
      .trim(),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty must be string',
      required_error: 'Faculty is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Please provide academic Department name',
        invalid_type_error: 'Academic Department must ne string',
      })
      .min(4, { message: 'Name must be greater then 3' })
      .trim()
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
});

export const academicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
