import mongoose from 'mongoose';
import { TErrorResponse, TErrorSources } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode: 400,
    message: 'Invalid _id',
    errorSources,
  };
};

export default handleCastError;
