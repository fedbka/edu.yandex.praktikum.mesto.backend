import { Router } from 'express';
import { createUser, login } from '../controllers/users';
import { singInSchema, singUpSchema } from '../utils/validations';

const router = Router();

router.post('/signin', singInSchema, login);
router.post('/signup', singUpSchema, createUser);

export default router;
