import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import {
  createCard,
  deleteCard,
  disLikeCard,
  getCardById,
  getCards,
  likeCard,
} from '../controllers/cards';

const createCardSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCardSchema, createCard);
router.get('/cards/:id', getCardById);
router.delete('/cards/:id', deleteCard);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', disLikeCard);

export default router;
