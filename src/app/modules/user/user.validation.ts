import { z } from 'zod';
import { UserStatus } from './user.constant';

const changeUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const userValidationSchemas = {
  changeUserStatusValidationSchema,
};
