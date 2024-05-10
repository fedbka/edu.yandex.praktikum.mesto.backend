import { Schema, SchemaTypes, model } from 'mongoose';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: SchemaTypes.String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: SchemaTypes.String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: SchemaTypes.String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
    select: false,
  },
});

export default model<IUser>('user', userSchema);
