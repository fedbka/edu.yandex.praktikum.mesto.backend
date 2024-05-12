import { model, Schema, SchemaTypes } from 'mongoose';
import { urlValidation } from '../utils/validations';

export interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: SchemaTypes.String,
      required: true,
      validate: urlValidation,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    likes: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model<ICard>('card', cardSchema);
