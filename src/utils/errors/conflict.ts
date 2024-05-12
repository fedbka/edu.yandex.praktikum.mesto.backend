import { constants } from 'http2';
import { MESSAGE_ERROR_CONFLICT } from '../messages';

class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string = MESSAGE_ERROR_CONFLICT) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
  }
}

export default ConflictError;
