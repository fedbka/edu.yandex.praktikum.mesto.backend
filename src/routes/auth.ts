import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { createUser, login } from '../controllers/users';

const router = Router();

const singInSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const singUpSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

router.post('/signin', singInSchema, login);
router.post('/signup', singUpSchema, createUser);

export default router;
