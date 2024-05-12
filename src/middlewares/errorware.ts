import { CelebrateError } from 'celebrate';
import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import BadRequestError from '../utils/errors/bad-request';
import ServerError from '../utils/errors/server';
import {
  MESSAGE_BAD_REQUEST,
  MESSAGE_CAST_ERROR,
} from '../utils/messages';

const errorWare: ErrorRequestHandler = (err, req, res, next) => {
  let error;
  if (err instanceof mongoose.Error.ValidationError) {
    error = new BadRequestError(`${MESSAGE_BAD_REQUEST}: ${err.message}`);
  }

  if (err instanceof mongoose.Error.CastError) {
    error = new BadRequestError(`${MESSAGE_CAST_ERROR}: ${err.message}`);
  }

  if (err instanceof CelebrateError) {
    let validationErrorMessage: string = '';
    err.details.forEach((key) => {
      validationErrorMessage += key.details.reduce((prev: string, item) => prev + item.message, '');
    });
    error = new BadRequestError(`${MESSAGE_BAD_REQUEST}: ${validationErrorMessage}`);
  }
  if (!err || !(err instanceof Error)) {
    error = new ServerError();
  }

  if (!error) {
    error = err as ServerError;
  }

  res.status(error.statusCode).send({ message: error.message });

  next();
};

export default errorWare;
