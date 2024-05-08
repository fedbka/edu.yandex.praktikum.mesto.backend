import { Request, Response } from 'express';
import Users, { IUser } from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find({});
    return res.send({ data: users });
  } catch {
    return res.status(500).send({ message: 'Не удалось получить список пользователей' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params?._id;
    if (!userId) {
      return res.status(400).send({ message: 'Не удалось определить идентификатор запрашиваемого пользователя' });
    }

    const user = await Users.findById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ message: 'Не удалось найти пользователя с указанным идентификатором', _id: userId });
    }
    return res.send({ data: user });
  } catch {
    return res.status(500).send({ message: 'Не удалось получить список пользователей' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar }: IUser = req.body;
    const user = await Users.create({ name, about, avatar });
    return res.send({ data: user });
  } catch (error) {
    return res.status(400).send({
      message: 'Не удалось обработать запрос на создание пользователя',
      error,
    });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId: string = req.body?._id;
    if (!userId) {
      return res.status(400).send({ message: 'Не удалось определить идентификатор пользователя обновляемого профиля' });
    }

    const { name, about, avatar }: IUser = req.body;

    const user = await Users.findByIdAndUpdate(userId, { name, about, avatar }, { returnDocument: 'after' });

    if (!user) {
      return res
        .status(404)
        .send({ message: 'Не удалось найти пользователя с указанным идентификатором', _id: userId });
    }
    return res.send({ data: user });
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось обновить профиль пользователя', error });
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const userId: string = req.body?._id;
    if (!userId) {
      return res.status(400).send({ message: 'Не удалось определить идентификатор пользователя обновляемого профиля' });
    }

    const avatar: string = req.body?.avatar;
    const user = await Users.findByIdAndUpdate(userId, { avatar }, { returnDocument: 'after' });

    if (!user) {
      return res
        .status(404)
        .send({ message: 'Не удалось найти пользователя с указанным идентификатором', _id: userId });
    }
    return res.send({ data: user });
  } catch (error) {
    return res.status(500).send({ message: 'Не удалось обновить аватар пользователя', error });
  }
};
