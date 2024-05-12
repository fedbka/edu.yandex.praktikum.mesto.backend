import { constants } from 'http2';
import { MESSAGE_FORBIDDEN } from '../messages';

class ForbiddenError extends Error {
  public statusCode: number;

  constructor(message: string = MESSAGE_FORBIDDEN) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_FORBIDDEN;
  }
}

export default ForbiddenError;
