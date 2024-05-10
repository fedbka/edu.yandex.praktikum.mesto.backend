import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import isEmail from 'validator/lib/isEmail';
import Users, { IUser } from '../models/user';
import {
  ERORR_USER_NOT_FOUND,
  ERROR_AUTH,
  ERROR_REQUEST_VALIDATION,
  ERROR_USER_UPDATE,
  catchError,
  sendError,
} from '../utils/errors';

const passwordSalt = 77;

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
    const { name, about, avatar, email, password }: IUser = req.body;

    if (!isEmail(email)) {
      return sendError(res, ERROR_REQUEST_VALIDATION);
    }

    const passwordHash = await bcrypt.hash(password, passwordSalt);
    console.log(passwordHash);
    const user = await Users.create({
      name,
      about,
      avatar,
      email,
      passwordHash,
    });
    return res.send(user);
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
    const user = await Users.findByIdAndUpdate(
      userId,
      { avatar },
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } : {email: string, password: string}= req.body;

    Users.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          sendError(res, ERROR_AUTH);
        }

        return bcrypt.hash(password, passwordSalt);
      })
      .then((hash) => {
        if (passwordHash !== user?.password) {
          sendError(res, ERROR_AUTH);
        }

      })



      });
  } catch (error) {
    return catchError(res, error);
  }
};
