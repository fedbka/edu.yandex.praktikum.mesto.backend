import { constants } from 'http2';
import { MESSAGE_ERROR_AUTHENTICATION_FAILED } from '../messages';

class AuthError extends Error {
  public statusCode: number;

  constructor(message: string = MESSAGE_ERROR_AUTHENTICATION_FAILED) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
  }
}

export default AuthError;
