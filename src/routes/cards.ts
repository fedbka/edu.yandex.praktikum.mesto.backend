import { Router } from 'express';
import { getCards, createCard, deleteCard, disLikeCard, likeCard } from '../controllers/cards';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards', deleteCard);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', disLikeCard);

export default router;