import { Request, Response } from 'express';
import Users from '../models/user';
import Cards from '../models/card';

export const getCards = async (req: Request, res: Response) => {
  try {
    const data = await Cards.find({});
    return res.send({ data });
  } catch {
    return res.status(500).send({ message: 'Не удалось получить список карточек' });
  }
};

export const createCard = async (req: Request, res: Response) => {
  type requiredFields = {
    name: string;
    link: string;
    owner: string;
  };
  try {
    const { name, link, owner: userId }: requiredFields = req.body;

    if (!name || !link || !userId) {
      return res.status(400).send({ message: 'Не удалось создать карточку - не все обязательные поля указаны' });
    }

    const user = await Users.findById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ message: 'Не удалось найти пользователя с указанным идентификатором', _id: userId });
    }

    const card = await Cards.create({ name, link, owner: userId, createdAt: Date.now() });
    return res.send({ data: card });
  } catch (error) {
    return res.status(400).send({
      message: 'Не создать карточку',
      error,
    });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const cardId = req.body;

    if (!cardId) {
      return res.status(404).send({ message: 'Не удалось выполнить удаление карточки - не указан _id карточки.' });
    }

    const card = await Cards.findById(cardId);

    if (!card) {
      return res.status(404).send({ message: 'Не удалось найти карточку с указанным идентификатором', _id: cardId });
    }

    await Cards.deleteOne({ _id: cardId });
    return res.send({ message: 'Карточка удалена', card });
  } catch (error) {
    return res.status(400).send({
      message: 'Не удалось выполнить удаление карточки',
      error,
    });
  }
};

export const likeCard = async (req: Request, res: Response) => {
  try {
    const userId = req.body?._id;
    if (!userId) {
      return res.status(404).send({ message: 'Не удалось определить идентификатор пользователя', _id: userId });
    }

    const cardId = req.params?.id;

    if (!cardId) {
      return res.status(404).send({ message: 'Не удалось определить идентификатор карточки', _id: cardId });
    }

    const card = await Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { returnDocument: 'after' });

    if (!card) {
      return res.status(400).send({ message: 'Не удалось обновить карточку с указанным идентификатором', _id: cardId });
    }
    return res.send({ data: card });
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось обновить карточку', error });
  }
};

export const disLikeCard = async (req: Request, res: Response) => {
  try {
    const userId = req.body?._id;
    if (!userId) {
      return res.status(404).send({ message: 'Не удалось определить идентификатор пользователя', _id: userId });
    }

    const cardId = req.params?.id;

    if (!cardId) {
      return res.status(404).send({ message: 'Не удалось найти карточку с указанным идентификатором', _id: cardId });
    }

    const card = await Cards.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { returnDocument: 'after' });

    if (!card) {
      return res.status(400).send({ message: 'Не удалось обновить карточку с указанным идентификатором', _id: cardId });
    }
    return res.send({ data: card });
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось обновить карточку', error });
  }
};
