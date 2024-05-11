import { constants } from 'http2';

class AuthError extends Error {
  public statusCode: number;

  constructor(message: string = 'Передан неверный логин или пароль') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
  }
}

export default AuthError;
