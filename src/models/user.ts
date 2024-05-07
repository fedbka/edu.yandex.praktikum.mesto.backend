import { Schema, SchemaTypes, model } from 'mongoose';

interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: SchemaTypes.String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: SchemaTypes.String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: SchemaTypes.String,
    required: true,
  },
});

export default model<IUser>('user', userSchema);
