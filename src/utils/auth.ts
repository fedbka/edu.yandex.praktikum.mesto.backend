import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const { PASSWORD_SALT_ROUNDS = 10 } = process.env;
export const JWT_SECRET_KEY = 'VbhyjtYt,jLkzDct[';
export const JWT_TOKEN_OPTIONS = {
  expiresIn: '7d',
};

type TPayload = {
  [key: string]: string;
};

export const getToken = (payload: TPayload) => jwt.sign(payload, JWT_SECRET_KEY, JWT_TOKEN_OPTIONS);

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET_KEY);

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(PASSWORD_SALT_ROUNDS));
  return bcrypt.hash(password, salt);
};

export const matchPassword = async (password: string, hash: string) => bcrypt.compare(password, hash);
