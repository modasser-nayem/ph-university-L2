import mongoose from 'mongoose';
import { TErrorResponse, TErrorSources } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val?.message,
      };
    },
  );
  return {
    statusCode: 400,
    message: 'Bad Request',
    errorSources,
  };
};

export default handleValidationError;
