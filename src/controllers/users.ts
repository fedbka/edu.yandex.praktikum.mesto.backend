import { NextFunction, Request, Response } from 'express';
import { normalizeEmail } from 'validator';
import Users, { IUser } from '../models/user';
import { getToken, hashPassword, matchPassword } from '../utils/auth';
import AuthError from '../utils/errors/auth';
import BadRequestError from '../utils/errors/bad-request';
import ConflictError from '../utils/errors/conflict';
import NotFoundError from '../utils/errors/not-found';
import {
  MESSAGE_USER_CONFLICT_EMAIL,
  MESSAGE_USER_NOT_FOUND,
  MESSAGE_USER_SUCCES_AUTHENTICATION,
} from '../utils/messages';

const MONGODB_UNIQUE_CONFLICT_PREFIX = 'E11000';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      return next(new BadRequestError());
    }

    const user = await Users.findById(userId).orFail(new NotFoundError(MESSAGE_USER_NOT_FOUND));

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id: userId } = res.locals.user;
    if (!userId) {
      return next(new AuthError());
    }

    const user = await Users.findById(userId).orFail(new NotFoundError(MESSAGE_USER_NOT_FOUND));

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    }: IUser = req.body;

    const passwordHash = await hashPassword(password);

    const user = await Users.create({
      name,
      about,
      avatar,
      email: normalizeEmail(email),
      password: passwordHash,
    });

    return res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith(MONGODB_UNIQUE_CONFLICT_PREFIX)) {
      return next(new ConflictError(MESSAGE_USER_CONFLICT_EMAIL));
    }
    return next(error);
  }
};

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id: userId } = res.locals.user;
    const { name, about, avatar }: IUser = req.body;

    const user = await Users.findByIdAndUpdate(
      userId,
      { name, about, avatar },
      { returnDocument: 'after', runValidators: true },
    ).orFail(new NotFoundError(MESSAGE_USER_NOT_FOUND));

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id: userId } = res.locals.user;
    const { avatar } = req.body;
    const user = await Users.findByIdAndUpdate(
      userId,
      { avatar },
      { returnDocument: 'after', runValidators: true },
    ).orFail(new NotFoundError(MESSAGE_USER_NOT_FOUND));

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await Users.findOne({ email }).select('+password').orFail(new AuthError());

    const matched = await matchPassword(password, user.password);
    if (!matched) {
      return next(new AuthError());
    }

    const token = getToken({ _id: user._id.toString() });
    return res
      .cookie('token', token, { httpOnly: true, sameSite: true })
      .send({ message: MESSAGE_USER_SUCCES_AUTHENTICATION });
  } catch (error) {
    return next(error);
  }
};
