import { model, Schema, SchemaTypes } from 'mongoose';

export interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>({
  name: {
    type: SchemaTypes.String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: SchemaTypes.String,
    required: true,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  likes: [
    {
      type: SchemaTypes.ObjectId,
    },
  ],
  createdAt: {
    type: SchemaTypes.Date,
    default: Date.now,
  },
});

export default model<ICard>('card', cardSchema);
