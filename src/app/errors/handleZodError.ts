import { TErrorResponse, TErrorSources } from '../interface/error';
import { ZodError, ZodIssue } from 'zod';

const handleZodError = (err: ZodError): TErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode: 400,
    message: 'Bad Request',
    errorSources,
  };
};

export default handleZodError;
