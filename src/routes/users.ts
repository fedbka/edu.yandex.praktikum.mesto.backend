import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import {
  getUserById,
  getUsers,
  updateUserAvatar,
  updateUserProfile,
} from '../controllers/users';

const updateUserProfileSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
  }),
});

const updateUserAvatarSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', getUserById);
router.patch('/users/me', updateUserProfileSchema, updateUserProfile);
router.patch('/users/me/avatar', updateUserAvatarSchema, updateUserAvatar);

export default router;
