import { Router } from 'express';
import {
  createCard,
  deleteCard,
  disLikeCard,
  getCardById,
  getCards,
  likeCard,
} from '../controllers/cards';
import { createCardSchema, requestWithIdParam } from '../utils/validations';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCardSchema, createCard);
router.get('/cards/:id', getCardById);
router.delete('/cards/:id', requestWithIdParam, deleteCard);
router.put('/cards/:id/likes', requestWithIdParam, likeCard);
router.delete('/cards/:id/likes', requestWithIdParam, disLikeCard);

export default router;
