import { constants } from 'http2';
import { MESSAGE_CONFLICT_ERROR } from '../messages';

class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string = MESSAGE_CONFLICT_ERROR) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
  }
}

export default ConflictError;
