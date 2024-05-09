import { Request, Response } from 'express';
import Cards from '../models/card';

import {
  ERORR_CARD_NOT_FOUND,
  ERROR_CARD_DELETE,
  ERROR_CARD_UPDATE,
  ERROR_REQUEST_VALIDATION,
  catchError,
  sendError,
} from '../utils/errors';

export const getCards = async (req: Request, res: Response) => {
  try {
    const data = await Cards.find({});
    return res.send({ data });
  } catch (error) {
    return catchError(res, error);
  }
};

export const getCardById = async (req: Request, res: Response) => {
  try {
    const { id: cardId } = req.params;
    if (!cardId) {
      return sendError(res, ERROR_REQUEST_VALIDATION);
    }

    const card = await Cards.findById(cardId);
    if (!card) {
      return sendError(res, ERORR_CARD_NOT_FOUND);
    }

    return res.send(card);
  } catch (error) {
    return catchError(res, error);
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const { name, link } = req.body;

    if (!name || !link) {
      return sendError(res, ERROR_REQUEST_VALIDATION);
    }

    const card = await Cards.create({ name, link, owner: res.locals.user });
    return res.status(201).send(card);
  } catch (error) {
    return catchError(res, error);
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = res.locals.user;
    const { id: cardId } = req.params;
    if (!cardId) {
      return sendError(res, ERROR_REQUEST_VALIDATION);
    }

    const card = await Cards.findById(cardId);
    if (!card) {
      return sendError(res, ERORR_CARD_NOT_FOUND);
    }

    if (card.owner !== userId) {
      return sendError(res, ERROR_CARD_DELETE);
    }

    await Cards.deleteOne({ _id: cardId });
    return res.send({ message: 'Карточка удалена' });
  } catch (error) {
    return catchError(res, error);
  }
};

export const likeCard = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = res.locals.user;
    const { id: cardId } = req.params;
    if (!cardId) {
      return sendError(res, ERROR_REQUEST_VALIDATION);
    }

    const card = await Cards.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { returnDocument: 'after', runValidators: true },
    );
    if (!card) {
      return sendError(res, ERROR_CARD_UPDATE);
    }

    return res.send(card);
  } catch (error) {
    return catchError(res, error);
  }
};

export const disLikeCard = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = res.locals.user;
    const { id: cardId } = req.params;
    if (!cardId) {
      return sendError(res, ERROR_REQUEST_VALIDATION);
    }

    const card = await Cards.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { returnDocument: 'after', runValidators: true },
    );
    if (!card) {
      return sendError(res, ERROR_CARD_UPDATE);
    }

    return res.send(card);
  } catch (error) {
    return catchError(res, error);
  }
};
