import { Schema, SchemaTypes, model } from 'mongoose';
import { emailValidation, urlValidation } from '../utils/validations';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const DEFAULT_USER_NAME = 'Жак-Ив Кусто';
const DEFAULT_USER_ABOUT = 'Исследователь';
const DEFAULT_USER_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: SchemaTypes.String,
      minlength: 2,
      maxlength: 30,
      default: DEFAULT_USER_NAME,
    },
    about: {
      type: SchemaTypes.String,
      minlength: 2,
      maxlength: 200,
      default: DEFAULT_USER_ABOUT,
    },
    avatar: {
      type: SchemaTypes.String,
      default: DEFAULT_USER_AVATAR,
      validate: urlValidation,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
      validate: emailValidation,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model<IUser>('user', userSchema);
