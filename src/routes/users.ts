import { Router } from 'express';
import {
  getMe,
  getUserById,
  getUsers,
  updateUserAvatar,
  updateUserProfile,
} from '../controllers/users';
import { requestWithIdParam, updateUserAvatarSchema, updateUserProfileSchema } from '../utils/validations';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', getMe);
router.get('/users/:id', requestWithIdParam, getUserById);
router.patch('/users/me', updateUserProfileSchema, updateUserProfile);
router.patch('/users/me/avatar', updateUserAvatarSchema, updateUserAvatar);

export default router;
