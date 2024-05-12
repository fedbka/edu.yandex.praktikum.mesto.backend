import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/auth';
import AuthError from '../utils/errors/auth';
import { MESSAGE_ERROR_AUTHENTICATION_REQUIRED } from '../utils/messages';

const authWare = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  let payload;
  try {
    payload = verifyToken(token);
  } catch (error) {
    return next(new AuthError(MESSAGE_ERROR_AUTHENTICATION_REQUIRED));
  }

  // Размещаем тут по согласованию с преподователем.
  // https://app.pachca.com/chats?thread_id=3605212&sidebar_message=242177505
  res.locals.user = payload;

  return next();
};

export default authWare;
