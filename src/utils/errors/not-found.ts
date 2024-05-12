import { constants } from 'http2';
import { MESSAGE_NOT_FOUND } from '../messages';

class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string = MESSAGE_NOT_FOUND) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
  }
}

export default NotFoundError;
