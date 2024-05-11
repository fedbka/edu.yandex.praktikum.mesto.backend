import { NextFunction, Request, Response, Router } from 'express';
import NotFoundError from '../utils/errors/not-found';

const router = Router();

router.get('*', (req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));
router.post('*', (req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));
router.put('*', (req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));
router.patch('*', (req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));
router.delete('*', (req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));

export default router;
