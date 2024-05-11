import { CelebrateError } from 'celebrate';
import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import BadRequestError from '../utils/errors/bad-request';
import ServerError from '../utils/errors/server';

const errorWare: ErrorRequestHandler = (err, req, res, next) => {
  let error;
  console.log(err);
  if (err instanceof mongoose.Error.ValidationError) {
    error = new BadRequestError(
      'Ошибка валидации данных запроса: \
    ' + err.message
    );
  }

  if (err instanceof mongoose.Error.CastError) {
    error = new BadRequestError(
      'Ошибка преобразования данных запроса: \
    ' + err.message
    );
  }

  if (err instanceof CelebrateError) {
    let validationErrorMessage: string = '';
    err.details.forEach((key) => {
      validationErrorMessage += key.details.reduce((prev, item) => (prev += item.message), '');
    });
    error = new BadRequestError(
      'Ошибка валидации данных запроса: \
    ' + validationErrorMessage
    );
  }
  if (!err || !(err instanceof Error)) {
    error = new ServerError('Непредвиденная ошибка сервера');
  }

  if (!error) {
    error = err as ServerError;
  }

  res.status(error.statusCode).send({ message: error.message });

  next();
};

export default errorWare;
