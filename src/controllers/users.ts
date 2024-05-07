import { Request, Response } from 'express';
import Users from '../models/user';

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
    const userId = req.params?.id;
    if (!userId) {
      return res.status(400).send({ message: 'Не удалось определить идентификатор запрашиваемого пользователя' });
    }

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'Не удалось найти пользователя с указанным идентификатором', _id: userId });
    }
    return res.send({ data: user });
  } catch {
    return res.status(500).send({ message: 'Не удалось получить список пользователей' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar }: { name: string; about: string; avatar: string } = req.body;
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
    const { name, about, avatar, id: userId }: { name: string; about: string; avatar: string; id: string } = req.body;
    if (!userId) {
      return res.status(400).send({ message: 'Не удалось определить идентификатор пользователя обновляемого профиля' });
    }

    const user = await Users.findByIdAndUpdate(userId, { name, about, avatar }, { returnDocument: 'after' });

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

export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar, id: userId }: { avatar: string; id: string } = req.body;
    if (!userId) {
      return res.status(400).send({ message: 'Не удалось определить идентификатор пользователя обновляемого профиля' });
    }

    const user = await Users.findByIdAndUpdate(userId, { avatar }, { returnDocument: 'after' });

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
