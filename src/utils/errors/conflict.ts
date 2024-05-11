import { constants } from 'http2';

class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string = 'Конфликт при работе с данными') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
  }
}

export default ConflictError;
