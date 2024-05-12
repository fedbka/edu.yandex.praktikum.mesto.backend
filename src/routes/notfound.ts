import {
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import NotFoundError from '../utils/errors/not-found';

const router = Router();

router.use('*', (req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));

export default router;
