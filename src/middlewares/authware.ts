import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/auth';
import AuthError from '../utils/errors/auth';

const authWare = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Требуется авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = verifyToken(token);
  } catch (error) {
    return next(new AuthError('Требуется авторизация'));
  }

  // Размещаем тут по согласованию с преподователем.
  res.locals.user = payload;

  return next();
};

export default authWare;
