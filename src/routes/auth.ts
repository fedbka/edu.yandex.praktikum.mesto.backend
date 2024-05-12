import { Router } from 'express';
import { createUser, login, logout } from '../controllers/users';
import { singInSchema, singUpSchema } from '../utils/validations';

const router = Router();

router.post('/signin', singInSchema, login);
router.post('/signup', singUpSchema, createUser);
router.get('/signout', logout);

export default router;
