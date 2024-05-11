import { constants } from 'http2';

class ServerError extends Error {
  public statusCode: number;

  constructor(message: string = 'Непредвиденная ошибка сервера') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  }
}

export default ServerError;
