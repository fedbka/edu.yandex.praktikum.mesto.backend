import { Response } from 'express';

type TError = {
  code: number;
  message: string;
};

export const ERORR_NOT_FOUND: TError = {
  code: 404,
  message: 'Запрашиваемый ресурс не найден',
};

export const ERORR_USER_NOT_FOUND: TError = {
  code: 404,
  message: 'Запрашиваемый пользователь с указанным идентификатором не найден',
};

export const ERORR_CARD_NOT_FOUND: TError = {
  code: 404,
  message: 'Запрашиваемая карточка с указанным идентификатором не найдена',
};

export const ERROR_INTRENAL: TError = {
  code: 500,
  message: 'Непредвиденная ошибка на сервере',
};

export const ERROR_CAST: TError = {
  code: 400,
  message: 'Ошибка валидации данных при взаимодействии с БД',
};

export const ERROR_REQUEST_VALIDATION: TError = {
  code: 400,
  message: 'Ошибка валидации данных запроса',
};

export const ERROR_VALIDATION: TError = {
  code: 400,
  message: 'Ошибка валидации данных при взаимодействии с БД',
};

export const ERROR_CARD_UPDATE: TError = {
  code: 400,
  message: 'Не удалось обновить карточку с указанным идентификатором',
};

export const ERROR_USER_UPDATE: TError = {
  code: 400,
  message: 'Не удалось обновить пользователя с указанным идентификатором',
};

export const ERROR_CARD_DELETE: TError = {
  code: 403,
  message: 'Не удалось удалить карточку с указанным идентификтаром по причине отсутствия полномочий',
};

export const sendError = (res: Response, error: TError) => res.status(error.code).send({ message: error.message });

export const catchError = (res: Response, error: unknown) => {
  const { name: errorName }: { name: string } = error as { name: string };

  if (errorName === 'ValidationError') {
    return sendError(res, ERROR_VALIDATION);
  }

  if (errorName === 'CastError') {
    return sendError(res, ERROR_CAST);
  }

  return sendError(res, ERROR_INTRENAL);
};
