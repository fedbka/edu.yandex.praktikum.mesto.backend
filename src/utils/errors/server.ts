import { constants } from 'http2';
import { MESSAGE_ERROR_INTERNAL_SERVER_ERROR } from '../messages';

class ServerError extends Error {
  public statusCode: number;

  constructor(message: string = MESSAGE_ERROR_INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  }
}

export default ServerError;
