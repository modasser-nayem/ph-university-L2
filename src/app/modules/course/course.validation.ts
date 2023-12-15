import { z } from 'zod';

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z
      .array(
        z.object({
          course: z.string(),
        }),
      )
      .optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    prefix: z.string().trim().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(
        z.object({
          course: z.string(),
          isDeleted: z.boolean(),
        }),
      )
      .optional(),
  }),
});

const courseFacultiesValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidationSchemas = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  courseFacultiesValidationSchema,
};
