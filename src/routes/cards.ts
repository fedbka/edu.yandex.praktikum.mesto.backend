import { Router } from 'express';
import {
  createCard,
  deleteCard,
  disLikeCard,
  getCardById,
  getCards,
  likeCard,
} from '../controllers/cards';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.get('/cards/:id', getCardById);
router.delete('/cards/:id', deleteCard);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', disLikeCard);

export default router;
