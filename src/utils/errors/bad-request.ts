import { constants } from 'http2';

class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string = 'Ошибка валидации данных запроса') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
  }
}

export default BadRequestError;
