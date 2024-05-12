import { constants } from 'http2';
import { MESSAGE_ERROR_BAD_REQUEST } from '../messages';

class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string = MESSAGE_ERROR_BAD_REQUEST) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
  }
}

export default BadRequestError;
