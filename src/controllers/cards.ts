import { NextFunction, Request, Response } from 'express';
import Cards from '../models/card';
import BadRequestError from '../utils/errors/bad-request';
import ForbiddenError from '../utils/errors/forbidden';
import NotFoundError from '../utils/errors/not-found';
import {
  MESSAGE_CARD_FORBIDDEN,
  MESSAGE_CARD_NOT_FOUND,
  MESSAGE_CARD_SUCCES_DELETE,
} from '../utils/messages';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Cards.find({});
    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

export const getCardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: cardId } = req.params;
    if (!cardId) {
      return next(new BadRequestError());
    }

    const card = await Cards.findById(cardId).orFail(new NotFoundError(MESSAGE_CARD_NOT_FOUND));

    return res.send(card);
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const card = await Cards.create({ name, link, owner: res.locals.user });
    return res.status(201).send(card);
  } catch (error) {
    return next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: cardId } = req.params;
    if (!cardId) return next(new BadRequestError());

    const card = await Cards.findById(cardId).orFail(new NotFoundError(MESSAGE_CARD_NOT_FOUND));

    if (String(card.owner) !== res.locals.user._id) {
      return next(new ForbiddenError(MESSAGE_CARD_FORBIDDEN));
    }

    await Cards.deleteOne({ _id: cardId }).orFail(new NotFoundError(MESSAGE_CARD_NOT_FOUND));

    return res.send({ message: MESSAGE_CARD_SUCCES_DELETE });
  } catch (error) {
    return next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: cardId } = req.params;
    if (!cardId) return next(new BadRequestError());

    const { _id: userId } = res.locals.user;
    const card = await Cards.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { returnDocument: 'after', runValidators: true },
    ).orFail(new NotFoundError(MESSAGE_CARD_NOT_FOUND));
    return res.send(card);
  } catch (error) {
    return next(error);
  }
};

export const disLikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: cardId } = req.params;
    if (!cardId) return next(new BadRequestError());

    const { _id: userId } = res.locals.user;
    const card = await Cards.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { returnDocument: 'after', runValidators: true },
    ).orFail(new NotFoundError(MESSAGE_CARD_NOT_FOUND));

    return res.send(card);
  } catch (error) {
    return next(error);
  }
};
