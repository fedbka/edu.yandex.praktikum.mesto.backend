import { Request, Response } from 'express';
import Users, { IUser } from '../models/user';
import {
  ERORR_USER_NOT_FOUND,
  ERROR_REQUEST_VALIDATION,
  ERROR_USER_UPDATE,
  catchError,
  sendError,
} from '../utils/errors';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find({});
    return res.send({ data: users });
  } catch (error) {
    return catchError(res, error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      return sendError(res, ERROR_REQUEST_VALIDATION);
    }

    const user = await Users.findById(userId);
    if (!user) {
      return sendError(res, ERORR_USER_NOT_FOUND);
    }

    return res.send(user);
  } catch (error) {
    return catchError(res, error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar }: IUser = req.body;
    const user = await Users.create({ name, about, avatar });
    return res.send({ data: user });
  } catch (error) {
    return catchError(res, error);
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = res.locals.user;
    const { name, about, avatar }: IUser = req.body;

    const user = await Users.findByIdAndUpdate(
      userId,
      { name, about, avatar },
      { returnDocument: 'after', runValidators: true }
    );

    if (!user) {
      return sendError(res, ERROR_USER_UPDATE);
    }

    return res.send(user);
  } catch (error) {
    return catchError(res, error);
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = res.locals.user;
    const { avatar } = req.body;
    const user = await Users.findByIdAndUpdate(userId, { avatar }, { returnDocument: 'after', runValidators: true });

    if (!user) {
      return sendError(res, ERROR_USER_UPDATE);
    }

    return res.send(user);
  } catch (error) {
    return catchError(res, error);
  }
};
